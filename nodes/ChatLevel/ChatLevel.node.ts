import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
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
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Template',
						value: 'template',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'message',
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
						description: 'Send a media message (image, video, document)',
						action: 'Send a media message',
					},
					{
						name: 'Send Template',
						value: 'sendTemplate',
						description: 'Send a template message',
						action: 'Send a template message',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get message details',
						action: 'Get a message',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple messages',
						action: 'Get many messages',
					},
				],
				default: 'sendText',
			},

			// Contact Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a contact',
						action: 'Create a contact',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get contact details',
						action: 'Get a contact',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple contacts',
						action: 'Get many contacts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a contact',
						action: 'Update a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
				],
				default: 'create',
			},

			// Media Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
				options: [
					{
						name: 'Upload',
						value: 'upload',
						description: 'Upload media file',
						action: 'Upload media',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get media details',
						action: 'Get media',
					},
					{
						name: 'Download',
						value: 'download',
						description: 'Download media file',
						action: 'Download media',
					},
				],
				default: 'upload',
			},

			// Template Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['template'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get template details',
						action: 'Get a template',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get multiple templates',
						action: 'Get many templates',
					},
				],
				default: 'get',
			},

			// Webhook Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a webhook',
						action: 'Create a webhook',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get webhook details',
						action: 'Get a webhook',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook',
						action: 'Update a webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete a webhook',
					},
				],
				default: 'create',
			},

			// Message: Send Text Fields
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendText', 'sendMedia', 'sendTemplate'],
					},
				},
				default: '',
				placeholder: '5511999999999',
				description: 'Recipient phone number with country code (no + or spaces)',
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
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'image',
				description: 'Type of media to send',
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
					},
				},
				default: '',
				description: 'URL of the media file to send',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
					},
				},
				default: '',
				description: 'Caption for the media',
			},
			{
				displayName: 'Filename',
				name: 'filename',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendMedia'],
						mediaType: ['document'],
					},
				},
				default: '',
				description: 'Filename for the document',
			},

			// Message: Send Template Fields
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendTemplate'],
					},
				},
				default: '',
				description: 'Name of the template to send',
			},
			{
				displayName: 'Template Language',
				name: 'templateLanguage',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendTemplate'],
					},
				},
				default: 'en',
				description: 'Template language code (e.g., en, pt_BR)',
			},
			{
				displayName: 'Template Parameters',
				name: 'templateParameters',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['sendTemplate'],
					},
				},
				default: '[]',
				description: 'Template parameters as JSON array',
			},

			// Message: Get Fields
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'ID of the message to retrieve',
			},

			// Message: Get Many Fields
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getMany'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getMany'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Phone Number',
						name: 'phoneNumber',
						type: 'string',
						default: '',
						description: 'Filter by phone number',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Sent',
								value: 'sent',
							},
							{
								name: 'Delivered',
								value: 'delivered',
							},
							{
								name: 'Read',
								value: 'read',
							},
							{
								name: 'Failed',
								value: 'failed',
							},
						],
						default: '',
						description: 'Filter by message status',
					},
					{
						displayName: 'From Date',
						name: 'fromDate',
						type: 'dateTime',
						default: '',
						description: 'Filter messages from this date',
					},
					{
						displayName: 'To Date',
						name: 'toDate',
						type: 'dateTime',
						default: '',
						description: 'Filter messages until this date',
					},
				],
			},

			// Contact: Create/Update Fields
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'Contact phone number with country code',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Contact name',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Contact email',
					},
					{
						displayName: 'Custom Fields',
						name: 'customFields',
						type: 'json',
						default: '{}',
						description: 'Custom fields as JSON object',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated tags',
					},
				],
			},

			// Contact: Get Many Fields
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getMany'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getMany'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search contacts by name or phone',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Filter by tags (comma-separated)',
					},
				],
			},

			// Media: Upload Fields
			{
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['upload'],
					},
				},
				options: [
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'image',
				description: 'Type of media to upload',
			},
			{
				displayName: 'Input Binary Field',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['upload'],
					},
				},
				description: 'Name of the binary property containing the file data',
			},

			// Media: Get/Download Fields
			{
				displayName: 'Media ID',
				name: 'mediaId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['get', 'download'],
					},
				},
				default: '',
				description: 'ID of the media to retrieve',
			},
			{
				displayName: 'Put Output in Field',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['download'],
					},
				},
				description: 'Name of the binary property to put the file data in',
			},

			// Template: Get Fields
			{
				displayName: 'Template Name',
				name: 'templateName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'Name of the template to retrieve',
			},

			// Template: Get Many Fields
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['getMany'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['template'],
						operation: ['getMany'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				description: 'Max number of results to return',
			},

			// Webhook Fields
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'URL to receive webhook events',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Message Received',
						value: 'message.received',
					},
					{
						name: 'Message Sent',
						value: 'message.sent',
					},
					{
						name: 'Message Delivered',
						value: 'message.delivered',
					},
					{
						name: 'Message Read',
						value: 'message.read',
					},
					{
						name: 'Message Failed',
						value: 'message.failed',
					},
				],
				default: ['message.received'],
				description: 'Events to subscribe to',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'ID of the webhook',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'message') {
					if (operation === 'sendText') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const message = this.getNodeParameter('message', i) as string;

						const body = {
							to: phoneNumber,
							type: 'text',
							text: {
								body: message,
							},
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/messages',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'sendMedia') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const mediaType = this.getNodeParameter('mediaType', i) as string;
						const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;
						const filename = this.getNodeParameter('filename', i, '') as string;

						const body: IDataObject = {
							to: phoneNumber,
							type: mediaType,
							[mediaType]: {
								link: mediaUrl,
							},
						};

						if (caption) {
							(body[mediaType] as IDataObject).caption = caption;
						}

						if (filename && mediaType === 'document') {
							(body[mediaType] as IDataObject).filename = filename;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/messages',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'sendTemplate') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const templateName = this.getNodeParameter('templateName', i) as string;
						const templateLanguage = this.getNodeParameter('templateLanguage', i) as string;
						const templateParameters = this.getNodeParameter('templateParameters', i, '[]') as string;

						const parameters = JSON.parse(templateParameters);

						const body = {
							to: phoneNumber,
							type: 'template',
							template: {
								name: templateName,
								language: {
									code: templateLanguage,
								},
								components: [
									{
										type: 'body',
										parameters: parameters.map((param: string) => ({
											type: 'text',
											text: param,
										})),
									},
								],
							},
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/messages',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'get') {
						const messageId = this.getNodeParameter('messageId', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/messages/${messageId}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i, {});

						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						if (additionalFields.phoneNumber) {
							qs.phone = additionalFields.phoneNumber;
						}

						if (additionalFields.status) {
							qs.status = additionalFields.status;
						}

						if (additionalFields.fromDate) {
							qs.from = additionalFields.fromDate;
						}

						if (additionalFields.toDate) {
							qs.to = additionalFields.toDate;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							'/messages',
							{},
							qs,
						);

						const messages = returnAll ? responseData.data : responseData.data.slice(0, qs.limit as number);

						messages.forEach((message: IDataObject) => {
							returnData.push({ json: message, pairedItem: { item: i } });
						});
					}
				} else if (resource === 'contact') {
					if (operation === 'create') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {});

						const body: IDataObject = {
							phone: phoneNumber,
						};

						if (additionalFields.name) {
							body.name = additionalFields.name;
						}

						if (additionalFields.email) {
							body.email = additionalFields.email;
						}

						if (additionalFields.customFields) {
							body.customFields = JSON.parse(additionalFields.customFields as string);
						}

						if (additionalFields.tags) {
							body.tags = (additionalFields.tags as string).split(',').map((tag) => tag.trim());
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/contacts',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'get') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/contacts/${phoneNumber}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i, {});

						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						if (filters.search) {
							qs.search = filters.search;
						}

						if (filters.tags) {
							qs.tags = filters.tags;
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							'/contacts',
							{},
							qs,
						);

						const contacts = returnAll ? responseData.data : responseData.data.slice(0, qs.limit as number);

						contacts.forEach((contact: IDataObject) => {
							returnData.push({ json: contact, pairedItem: { item: i } });
						});
					} else if (operation === 'update') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {});

						const body: IDataObject = {};

						if (additionalFields.name) {
							body.name = additionalFields.name;
						}

						if (additionalFields.email) {
							body.email = additionalFields.email;
						}

						if (additionalFields.customFields) {
							body.customFields = JSON.parse(additionalFields.customFields as string);
						}

						if (additionalFields.tags) {
							body.tags = (additionalFields.tags as string).split(',').map((tag) => tag.trim());
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'PUT',
							`/contacts/${phoneNumber}`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'delete') {
						const phoneNumber = this.getNodeParameter('phoneNumber', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'DELETE',
							`/contacts/${phoneNumber}`,
						);

						returnData.push({ json: { success: true, ...responseData }, pairedItem: { item: i } });
					}
				} else if (resource === 'media') {
					if (operation === 'upload') {
						const mediaType = this.getNodeParameter('mediaType', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						const formData = {
							file: {
								value: dataBuffer,
								options: {
									filename: binaryData.fileName,
									contentType: binaryData.mimeType,
								},
							},
							type: mediaType,
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/media',
							{},
							{},
							undefined,
							{ formData },
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'get') {
						const mediaId = this.getNodeParameter('mediaId', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/media/${mediaId}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'download') {
						const mediaId = this.getNodeParameter('mediaId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/media/${mediaId}/download`,
							{},
							{},
							undefined,
							{ encoding: null, json: false },
						);

						const mediaInfo = await chatLevelApiRequest.call(
							this,
							'GET',
							`/media/${mediaId}`,
						);

						const binaryData = await this.helpers.prepareBinaryData(
							responseData as Buffer,
							mediaInfo.filename || `media-${mediaId}`,
							mediaInfo.mime_type,
						);

						returnData.push({
							json: mediaInfo,
							binary: {
								[binaryPropertyName]: binaryData,
							},
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'template') {
					if (operation === 'get') {
						const templateName = this.getNodeParameter('templateName', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/templates/${templateName}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i);

						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							'/templates',
							{},
							qs,
						);

						const templates = returnAll ? responseData.data : responseData.data.slice(0, qs.limit as number);

						templates.forEach((template: IDataObject) => {
							returnData.push({ json: template, pairedItem: { item: i } });
						});
					}
				} else if (resource === 'webhook') {
					if (operation === 'create') {
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const events = this.getNodeParameter('events', i) as string[];

						const body = {
							url: webhookUrl,
							events,
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'POST',
							'/webhooks',
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'get') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'GET',
							`/webhooks/${webhookId}`,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'update') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const events = this.getNodeParameter('events', i) as string[];

						const body = {
							url: webhookUrl,
							events,
						};

						const responseData = await chatLevelApiRequest.call(
							this,
							'PUT',
							`/webhooks/${webhookId}`,
							body,
						);

						returnData.push({ json: responseData, pairedItem: { item: i } });
					} else if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;

						const responseData = await chatLevelApiRequest.call(
							this,
							'DELETE',
							`/webhooks/${webhookId}`,
						);

						returnData.push({ json: { success: true, ...responseData }, pairedItem: { item: i } });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
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
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('chatLevelApi');

	const options: IDataObject = {
		method,
		body,
		qs,
		uri: uri || `${credentials.baseUrl || 'https://api.chatlevel.io/v1'}${endpoint}`,
		headers: {
			'Authorization': `Bearer ${credentials.apiKey}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (Object.keys(option).length) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeOperationError(
			this.getNode(),
			`ChatLevel API request failed: ${error.message}`,
			{ description: error.description },
		);
	}
}
