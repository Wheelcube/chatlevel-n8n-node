import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

export class ChatLevel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChatLevel',
		name: 'chatLevel',
		icon: 'file:chatlevel.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ChatLevel WhatsApp API',
		defaults: {
			name: 'ChatLevel',
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Device',
						value: 'device',
					},
					{
						name: 'Message',
						value: 'message',
					},
				],
				default: 'message',
			},

			// Device Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['device'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new device',
						action: 'Create a device',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a device',
						action: 'Delete a device',
					},
					{
						name: 'Disconnect',
						value: 'disconnect',
						description: 'Disconnect a device from WhatsApp',
						action: 'Disconnect a device',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a device',
						action: 'Get a device',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple devices',
						action: 'Get many devices',
					},
					{
						name: 'Restart',
						value: 'restart',
						description: 'Restart a device',
						action: 'Restart a device',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a device',
						action: 'Update a device',
					},
				],
				default: 'getMany',
			},

			// Message Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
					{
						name: 'Send Media',
						value: 'sendMedia',
						description: 'Send a media message (image only: PNG, JPEG, GIF, WebP)',
						action: 'Send a media message',
					},
				],
				default: 'sendText',
			},

			// Device ID field (used by most operations)
			{
				displayName: 'Select Device',
				name: 'selectDevice',
				type: 'options',
				options: [
					{
						name: 'From List',
						value: 'fromList',
					},
					{
						name: 'By ID',
						value: 'byId',
					},
				],
				default: 'fromList',
				description: 'Choose how to select the device',
			},
			{
				displayName: 'Device',
				name: 'deviceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getDevices',
				},
				displayOptions: {
					show: {
						selectDevice: ['fromList'],
					},
				},
				default: '',
				description: 'Select a device from the list',
			},
			{
				displayName: 'Device ID',
				name: 'deviceId',
				type: 'string',
				displayOptions: {
					show: {
						selectDevice: ['byId'],
					},
				},
				default: '',
				description: 'Enter the device ID manually',
			},

			// Device Create Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['device'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'User-friendly device name',
					},
					{
						displayName: 'Webhook URL',
						name: 'webhookUrl',
						type: 'string',
						default: '',
						description: 'Webhook URL for receiving events',
					},
					{
						displayName: 'Webhook Events',
						name: 'webhookEvents',
						type: 'multiOptions',
						options: [
							{
								name: 'Call',
								value: 'call',
							},
							{
								name: 'Connection Auth',
								value: 'connection.auth',
							},
							{
								name: 'Connection Closed',
								value: 'connection.closed',
							},
							{
								name: 'Connection Logout',
								value: 'connection.logout',
							},
							{
								name: 'Connection Open',
								value: 'connection.open',
							},
							{
								name: 'Connection Timeout',
								value: 'connection.timeout',
							},
							{
								name: 'Message Deleted',
								value: 'message.deleted',
							},
							{
								name: 'Message Received',
								value: 'message.received',
							},
							{
								name: 'Message Sent',
								value: 'message.sent',
							},
							{
								name: 'Message Updated',
								value: 'message.updated',
							},
						],
						default: [],
						description: 'Events to send to webhook (defaults to all)',
					},
					{
						displayName: 'Phone Number',
						name: 'phoneNumber',
						type: 'string',
						default: '',
						placeholder: '31612345678',
						description: 'Phone number for pairing code (alternative to QR). Digits only, include country code.',
					},
				],
			},

			// Device Update Fields
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['device'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'New name for the device',
					},
					{
						displayName: 'Webhook URL',
						name: 'webhookUrl',
						type: 'string',
						default: '',
						description: 'Webhook URL for receiving events (set to empty string to disable)',
					},
					{
						displayName: 'Webhook Events',
						name: 'webhookEvents',
						type: 'multiOptions',
						options: [
							{
								name: 'Call',
								value: 'call',
							},
							{
								name: 'Connection Auth',
								value: 'connection.auth',
							},
							{
								name: 'Connection Closed',
								value: 'connection.closed',
							},
							{
								name: 'Connection Logout',
								value: 'connection.logout',
							},
							{
								name: 'Connection Open',
								value: 'connection.open',
							},
							{
								name: 'Connection Timeout',
								value: 'connection.timeout',
							},
							{
								name: 'Message Deleted',
								value: 'message.deleted',
							},
							{
								name: 'Message Received',
								value: 'message.received',
							},
							{
								name: 'Message Sent',
								value: 'message.sent',
							},
							{
								name: 'Message Updated',
								value: 'message.updated',
							},
						],
						default: [],
						description: 'Events to send to webhook',
					},
					{
						displayName: 'Subscription Status',
						name: 'subscription_status',
						type: 'options',
						options: [
							{
								name: 'Active',
								value: 'active',
							},
							{
								name: 'Inactive',
								value: 'inactive',
							},
						],
						default: 'active',
						description: 'Subscription status (inactive stops WhatsApp session)',
					},
				],
			},

			// Device Restart Fields
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['device'],
						operation: ['restart'],
					},
				},
				default: '',
				placeholder: '31612345678',
				description: 'Phone number for pairing code (optional, alternative to QR)',
			},

			// Message: Send Text Fields
			{
				displayName: 'To Number',
				name: 'toNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendMedia'],
					},
				},
				default: '',
				placeholder: '31620292537',
				description: 'WhatsApp phone number (digits only)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText'],
					},
				},
				default: '',
				description: 'Text message to send',
				typeOptions: {
					rows: 4,
				},
			},

			// Message: Send Media Fields
			{
				displayName: 'Media Source',
				name: 'mediaSource',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
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
				description: 'Source of the media',
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
						mediaSource: ['url'],
					},
				},
				default: '',
				description: 'URL of the media file (PNG, JPEG, GIF, WebP only, max 10MB)',
			},
			{
				displayName: 'Media Base64',
				name: 'mediaBase64',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
						mediaSource: ['base64'],
					},
				},
				default: '',
				description: 'Base64 encoded media content (PNG, JPEG, GIF, WebP only, max 10MB)',
				typeOptions: {
					rows: 4,
				},
			},
			{
				displayName: 'Caption',
				name: 'mediaCaption',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'Optional caption for the media',
			},
		],
	};

	methods = {
		loadOptions: {
			async getDevices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('chatLevelApi');
				const response = await this.helpers.request({
					method: 'GET',
					uri: `${credentials.baseUrl || 'https://api.chatlevel.io/v1'}/devices`,
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
					},
					json: true,
				});

				if (!response.devices) {
					throw new Error('No devices found');
				}

				return response.devices.map((device: { id: number; name: string }) => ({
					name: device.name,
					value: device.id,
				}));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'device') {
					if (operation === 'create') {
						const additionalFields = this.getNodeParameter('additionalFields', i, {});

						const body: IDataObject = {};

						if (additionalFields.name) {
							body.name = additionalFields.name;
						}

						if (additionalFields.webhookUrl) {
							body.webhookUrl = additionalFields.webhookUrl;
						}

						if (additionalFields.webhookEvents && Array.isArray(additionalFields.webhookEvents) && additionalFields.webhookEvents.length > 0) {
							body.webhookEvents = additionalFields.webhookEvents;
						}

						if (additionalFields.phoneNumber) {
							body.phoneNumber = additionalFields.phoneNumber;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/devices',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'getMany') {
						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							'/devices',
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'get') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/devices/${deviceId}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'update') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i, {});

						const body: IDataObject = {};

						if (updateFields.name) {
							body.name = updateFields.name;
						}

						if (updateFields.webhookUrl !== undefined) {
							body.webhookUrl = updateFields.webhookUrl || null;
						}

						if (updateFields.webhookEvents && Array.isArray(updateFields.webhookEvents)) {
							body.webhookEvents = updateFields.webhookEvents;
						}

						if (updateFields.subscription_status) {
							body.subscription_status = updateFields.subscription_status;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'PUT',
							`/devices/${deviceId}`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'delete') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;

						await chatLevelApiRequest.call(
							this,
							'DELETE',
							`/devices/${deviceId}`,
						);

						returnData.push({ json: { success: true }, pairedItem: { item: i } });
					} else if (operation === 'disconnect') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							`/devices/${deviceId}/disconnect`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'restart') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;
						const phoneNumber = this.getNodeParameter('phoneNumber', i, '') as string;

						const body: IDataObject = {};

						if (phoneNumber) {
							body.phoneNumber = phoneNumber;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							`/devices/${deviceId}/restart`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					}
				} else if (resource === 'message') {
					if (operation === 'sendText') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;
						const toNumber = this.getNodeParameter('toNumber', i) as string;
						const message = this.getNodeParameter('message', i) as string;

						const body = {
							toNumber,
							message,
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							`/devices/${deviceId}/messages/text`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'sendMedia') {
						const deviceId = this.getNodeParameter('deviceId', i) as number;
						const toNumber = this.getNodeParameter('toNumber', i) as string;
						const mediaSource = this.getNodeParameter('mediaSource', i) as string;
						const mediaCaption = this.getNodeParameter('mediaCaption', i, '') as string;

						const body: IDataObject = {
							toNumber,
						};

						if (mediaSource === 'url') {
							const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
							body.mediaUrl = mediaUrl;
						} else {
							const mediaBase64 = this.getNodeParameter('mediaBase64', i) as string;
							body.mediaBase64 = mediaBase64;
						}

						if (mediaCaption) {
							body.mediaCaption = mediaCaption;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							`/devices/${deviceId}/messages/media`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					}
				}
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
		uri: `${credentials.baseUrl || 'https://api.chatlevel.io/v1'}${endpoint}`,
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
