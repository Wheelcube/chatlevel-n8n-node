"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelTrigger = void 0;
class ChatLevelTrigger {
    constructor() {
        this.description = {
            displayName: 'ChatLevel Trigger',
            name: 'chatLevelTrigger',
            icon: 'file:chatlevel.svg',
            group: ['trigger'],
            version: 1,
            description: 'Starts the workflow when ChatLevel events occur',
            defaults: {
                name: 'ChatLevel Trigger',
            },
            inputs: [],
            outputs: ['main'],
            credentials: [],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Events',
                    name: 'events',
                    type: 'multiOptions',
                    options: [
                        {
                            name: 'Device Connected',
                            value: 'device.connected',
                            description: 'Triggers when a device connects to WhatsApp',
                        },
                        {
                            name: 'Device Disconnected',
                            value: 'device.disconnected',
                            description: 'Triggers when a device disconnects from WhatsApp',
                        },
                        {
                            name: 'Message Deleted',
                            value: 'message.deleted',
                            description: 'Triggers when a message is deleted',
                        },
                        {
                            name: 'Message Received',
                            value: 'message.received',
                            description: 'Triggers when a message is received',
                        },
                        {
                            name: 'Message Sent',
                            value: 'message.sent',
                            description: 'Triggers when a message is sent',
                        },
                        {
                            name: 'Message Updated',
                            value: 'message.updated',
                            description: 'Triggers when a message is updated',
                        },
                        {
                            name: 'QR Code',
                            value: 'qr',
                            description: 'Triggers when a QR code is generated',
                        },
                        {
                            name: 'QR Timeout',
                            value: 'qr.timeout',
                            description: 'Triggers when QR code expires',
                        },
                    ],
                    default: [],
                    required: true,
                    description: 'The events to listen to',
                },
            ],
        };
        this.webhookMethods = {
            default: {
                async checkExists() {
                    return true;
                },
                async create() {
                    return true;
                },
                async delete() {
                    return true;
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        const events = this.getNodeParameter('events');
        // Get the event type from the webhook payload
        const eventType = bodyData.event;
        // Check if this event should be processed
        if (events.length > 0 && !events.includes(eventType)) {
            // Event not in the list, return without triggering workflow
            return {
                workflowData: [[]],
            };
        }
        // Return the full webhook data
        return {
            workflowData: [
                [
                    {
                        json: bodyData,
                    },
                ],
            ],
        };
    }
}
exports.ChatLevelTrigger = ChatLevelTrigger;
