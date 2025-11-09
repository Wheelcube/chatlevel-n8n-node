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

export class ChatLevelMedia implements INodeType {
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
		displayName: 'ChatLevel Media',
		name: 'chatLevelMedia',
		icon: 'file:chatlevel.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Send media messages via ChatLevel WhatsApp API',
		defaults: {
			name: 'ChatLevel Media',
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
						name: 'Send Media',
						value: 'sendMedia',
						description: 'Send a media message',
						action: 'Send a media message',
					},
				],
				default: 'sendMedia',
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
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				required: true,
				options: [
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'image',
				description: 'Type of media to send',
			},

			{
				displayName: 'Media Source',
				name: 'mediaSource',
				type: 'options',
				required: true,
				options: [
					{
						name: 'URL',
						value: 'url',
					},
					{
						name: 'Base64',
						value: 'base64',
					},
				],
				default: 'url',
				description: 'Source of the media content',
			},

			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						mediaSource: ['url'],
					},
				},
				default: '',
				description: 'URL of the media file',
			},

			{
				displayName: 'Media Base64',
				name: 'mediaBase64',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						mediaSource: ['base64'],
					},
				},
				default: '',
				description: 'Base64 encoded media content',
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
						displayName: 'Caption',
						name: 'caption',
						type: 'string',
						default: '',
						description: 'Caption for the media',
					},
					{
						displayName: 'Filename',
						name: 'filename',
						type: 'string',
						displayOptions: {
							show: {
								'/mediaType': ['document'],
							},
						},
						default: '',
						description: 'Custom filename for the document',
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
				// Get the device selection method and corresponding device ID
				const deviceSelection = this.getNodeParameter('deviceSelection', i) as string;
				let deviceId: number;
				
				if (deviceSelection === 'list') {
					const deviceFromList = this.getNodeParameter('deviceFromList', i) as { value: string };
					deviceId = parseInt(deviceFromList.value, 10);
				} else {
					deviceId = this.getNodeParameter('deviceId', i) as number;
				}

				if (!deviceId || isNaN(deviceId)) {
					throw new NodeOperationError(this.getNode(), 'Invalid Device ID');
				}

				const toNumber = this.getNodeParameter('toNumber', i) as string;
				const mediaType = this.getNodeParameter('mediaType', i) as string;
				const mediaSource = this.getNodeParameter('mediaSource', i) as string;
				const additionalFields = this.getNodeParameter('additionalFields', i, {});

				const body: IDataObject = {
					toNumber,
					mediaType,
				};

				if (mediaSource === 'url') {
					const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
					body.mediaUrl = mediaUrl;
				} else {
					const mediaBase64 = this.getNodeParameter('mediaBase64', i) as string;
					body.mediaBase64 = mediaBase64;
				}

				if (additionalFields.caption) {
					body.caption = additionalFields.caption;
				}

				if (mediaType === 'document' && additionalFields.filename) {
					body.filename = additionalFields.filename;
				}

				const responseData = await chatLevelApiRequest.call(
					this,
					'POST',
					`/devices/${deviceId}/messages/media`,
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