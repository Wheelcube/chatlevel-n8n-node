"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelDevice = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class ChatLevelDevice {
    constructor() {
        this.description = {
            displayName: 'ChatLevel Device',
            name: 'chatLevelDevice',
            icon: 'file:chatlevel.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"]}}',
            description: 'Manage ChatLevel WhatsApp devices',
            defaults: {
                name: 'ChatLevel Device',
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
                // Device ID field (used by most operations)
                {
                    displayName: 'Device ID',
                    name: 'deviceId',
                    type: 'number',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['get', 'update', 'delete', 'disconnect', 'restart'],
                        },
                    },
                    default: '',
                    description: 'The ID of the device',
                },
                // Device Get Fields
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            operation: ['get'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Include Subscription Status',
                            name: 'includeSubscriptionStatus',
                            type: 'boolean',
                            default: false,
                            description: 'Whether to include the WhatsApp Business subscription status in the response',
                        },
                    ],
                },
                {
                    displayName: 'Device ID',
                    name: 'deviceId',
                    type: 'number',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['message'],
                        },
                    },
                    default: '',
                    description: 'The ID of the device to send from',
                },
                // Device Create Fields
                {
                    displayName: 'Phone Number',
                    name: 'phoneNumber',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['device'],
                            operation: ['create'],
                        },
                    },
                    default: '',
                    description: 'Phone number with country code without + or 00',
                },
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
                            description: 'User-friendly device name (1-20 characters)',
                        },
                        {
                            displayName: 'Password',
                            name: 'password',
                            type: 'string',
                            default: '',
                            description: 'Password for user authorization',
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
                                    name: 'Connection Opened',
                                    value: 'connection.open',
                                },
                                {
                                    name: 'Connection Closed',
                                    value: 'connection.closed',
                                },
                                {
                                    name: 'Connection Authentication',
                                    value: 'connection.auth',
                                },
                                {
                                    name: 'Connection Timeout',
                                    value: 'connection.timeout',
                                },
                                {
                                    name: 'Connection Logout',
                                    value: 'connection.logout',
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
                                {
                                    name: 'Message Deleted',
                                    value: 'message.deleted',
                                },
                                {
                                    name: 'Call',
                                    value: 'call',
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
                            description: 'Webhook URL for receiving events (null to disable)',
                        },
                        {
                            displayName: 'Webhook Events',
                            name: 'webhookEvents',
                            type: 'multiOptions',
                            options: [
                                {
                                    name: 'Connection Opened',
                                    value: 'connection.open',
                                },
                                {
                                    name: 'Connection Closed',
                                    value: 'connection.closed',
                                },
                                {
                                    name: 'Connection Authentication',
                                    value: 'connection.auth',
                                },
                                {
                                    name: 'Connection Timeout',
                                    value: 'connection.timeout',
                                },
                                {
                                    name: 'Connection Logout',
                                    value: 'connection.logout',
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
                                {
                                    name: 'Message Deleted',
                                    value: 'message.deleted',
                                },
                                {
                                    name: 'Call',
                                    value: 'call',
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
                            operation: ['restart'],
                        },
                    },
                    default: '',
                    placeholder: '31612345678',
                    description: 'Phone number for pairing code (optional, alternative to QR)',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                if (operation === 'create') {
                    const phoneNumber = this.getNodeParameter('phoneNumber', i);
                    const additionalFields = this.getNodeParameter('additionalFields', i, {});
                    const body = {
                        phoneNumber,
                    };
                    if (additionalFields.name) {
                        body.name = additionalFields.name;
                    }
                    if (additionalFields.password) {
                        body.password = additionalFields.password;
                    }
                    if (additionalFields.webhookUrl) {
                        body.webhookUrl = additionalFields.webhookUrl;
                    }
                    if (additionalFields.webhookEvents && Array.isArray(additionalFields.webhookEvents) && additionalFields.webhookEvents.length > 0) {
                        body.webhookEvents = additionalFields.webhookEvents;
                    }
                    const responseData = await chatLevelApiRequest.call(this, 'POST', '/devices', body);
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
                else if (operation === 'getMany') {
                    const responseData = await chatLevelApiRequest.call(this, 'GET', '/devices');
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
                else if (operation === 'get') {
                    const deviceId = this.getNodeParameter('deviceId', i);
                    const additionalFields = this.getNodeParameter('additionalFields', i, {});
                    const qs = {};
                    if (additionalFields.includeSubscriptionStatus === true) {
                        qs.includeSubscriptionStatus = true;
                    }
                    const responseData = await chatLevelApiRequest.call(this, 'GET', `/devices/${deviceId}`, {}, qs);
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
                else if (operation === 'update') {
                    const deviceId = this.getNodeParameter('deviceId', i);
                    const updateFields = this.getNodeParameter('updateFields', i, {});
                    const body = {};
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
                    const responseData = await chatLevelApiRequest.call(this, 'PUT', `/devices/${deviceId}`, body);
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
                else if (operation === 'delete') {
                    const deviceId = this.getNodeParameter('deviceId', i);
                    await chatLevelApiRequest.call(this, 'DELETE', `/devices/${deviceId}`);
                    returnData.push({ json: { success: true }, pairedItem: { item: i } });
                }
                else if (operation === 'disconnect') {
                    const deviceId = this.getNodeParameter('deviceId', i);
                    const responseData = await chatLevelApiRequest.call(this, 'POST', `/devices/${deviceId}/disconnect`);
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
                else if (operation === 'restart') {
                    const deviceId = this.getNodeParameter('deviceId', i);
                    const phoneNumber = this.getNodeParameter('phoneNumber', i, '');
                    const body = {};
                    if (phoneNumber) {
                        body.phoneNumber = phoneNumber;
                    }
                    const responseData = await chatLevelApiRequest.call(this, 'POST', `/devices/${deviceId}/restart`, body);
                    returnData.push({ json: responseData, pairedItem: { item: i } });
                }
            }
            catch (error) {
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
exports.ChatLevelDevice = ChatLevelDevice;
async function chatLevelApiRequest(method, endpoint, body = {}, qs = {}) {
    const credentials = await this.getCredentials('chatLevelApi');
    const options = {
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
    }
    catch (error) {
        if (error instanceof Error) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `ChatLevel API request failed: ${error.message}`);
        }
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'ChatLevel API request failed with unknown error');
    }
}
