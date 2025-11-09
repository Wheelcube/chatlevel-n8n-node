import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	INodeListSearchResult,
	IDataObject,
	NodeOperationError,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';

export class ChatLevelText implements INodeType {
	methods = {
		listSearch: {
			async getDevices(this: ILoadOptionsFunctions): Promise<INodeListSearchResult> {
				const credentials = await this.getCredentials('chatLevelApi');

				const options: IRequestOptions = {
					method: 'GET' as IHttpRequestMethods,
					uri: 'https://api.chatlevel.io/v1/devices',
					headers: {
						'Authorization': `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				try {
					const response = await this.helpers.request(options);
					
					if (!response.devices || !Array.isArray(response.devices)) {
						throw new Error('Invalid response from ChatLevel API');
					}

					return {
						results: response.devices.map((device: any) => ({
							name: `${device.name || 'Unnamed Device'} (${device.status})`,
							value: device.id.toString(),
							// Add additional metadata that might be useful
							description: `Last Active: ${device.createdAt}`,
							...(device.webhookUrl && { url: device.webhookUrl }),
						})),
					};
				} catch (error) {
					throw new Error(`ChatLevel API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
				}
			},
		},
	};

	description: INodeTypeDescription = {
		displayName: 'ChatLevel Text',
		name: 'chatLevelText',
		icon: 'file:chatlevel.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send text messages via ChatLevel WhatsApp API',
		defaults: {
			name: 'ChatLevel Text',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'chatLevelApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
				],
				default: 'sendText',
			},

			{
				displayName: 'Select Device',
				name: 'deviceSelection',
				type: 'options',
				options: [
					{
						name: 'From List',
						value: 'list',
					},
					{
						name: 'By ID',
						value: 'id',
					},
				],
				default: 'list',
				description: 'Choose how to select the device',
			},

			{
				displayName: 'Device',
				name: 'deviceFromList',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				required: true,
				displayOptions: {
					show: {
						deviceSelection: ['list'],
					},
				},
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						typeOptions: {
							searchListMethod: 'getDevices',
							searchable: true,
						},
					},
				],
			},

			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						deviceSelection: ['id'],
					},
				},
				description: 'ID of the device to send from',
			},

			{
				displayName: 'To Number',
				name: 'toNumber',
				type: 'string',
				required: true,
				default: '',
				placeholder: '31612345678',
				description: 'WhatsApp phone number (digits only, 8-15 characters)',
			},

			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				default: '',
				description: 'Text message to send',
				typeOptions: {
					rows: 4,
				},
			},

			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Message Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Text',
								value: 'text',
							},
							{
								name: 'Template',
								value: 'template',
							},
						],
						default: 'text',
						description: 'Type of message to send',
					},
					{
						displayName: 'Template Name',
						name: 'templateName',
						type: 'string',
						displayOptions: {
							show: {
								type: ['template'],
							},
						},
						default: '',
						description: 'Name of the template to use',
					},
					{
						displayName: 'Template Language',
						name: 'templateLanguage',
						type: 'string',
						displayOptions: {
							show: {
								type: ['template'],
							},
						},
						default: 'en',
						description: 'Language code for the template',
					},
					{
						displayName: 'Template Variables',
						name: 'templateVariables',
						type: 'json',
						displayOptions: {
							show: {
								type: ['template'],
							},
						},
						default: '{}',
						description: 'Variables to use in the template',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				// Get device ID based on selection method
				const deviceSelection = this.getNodeParameter('deviceSelection', i) as string;
				let deviceId: number;

				if (deviceSelection === 'list') {
					const deviceFromList = this.getNodeParameter('deviceFromList', i) as { value: string };
					deviceId = parseInt(deviceFromList.value, 10);
				} else {
					deviceId = this.getNodeParameter('deviceId', i) as number;
				}

				const toNumber = this.getNodeParameter('toNumber', i) as string;
				const message = this.getNodeParameter('message', i) as string;
				const additionalFields = this.getNodeParameter('additionalFields', i, {});

				const body: IDataObject = {
					toNumber,
					message,
				};

				if (additionalFields.type === 'template') {
					body.type = 'template';
					body.templateName = additionalFields.templateName;
					body.templateLanguage = additionalFields.templateLanguage;
					
					if (additionalFields.templateVariables) {
						try {
							body.templateVariables = JSON.parse(additionalFields.templateVariables as string);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'Template variables must be valid JSON',
							);
						}
					}
				}

				const responseData = await chatLevelApiRequest.call(
					this,
					'POST',
					`/devices/${deviceId}/messages/text`,
					body,
				);

				returnData.push({ json: responseData, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({
						json: { error: errorMessage },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function chatLevelApiRequest(
	this: IExecuteFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('chatLevelApi');

	const options: IDataObject = {
		method,
		body,
		qs,
		uri: `https://api.chatlevel.io/v1${endpoint}`,
		headers: {
			'Authorization': `Bearer ${credentials.apiKey}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.request(options);
	} catch (error) {
		if (error instanceof Error) {
			throw new NodeOperationError(
				this.getNode(),
				`ChatLevel API request failed: ${error.message}`,
			);
		}
		throw new NodeOperationError(
			this.getNode(),
			'ChatLevel API request failed with unknown error',
		);
	}
}