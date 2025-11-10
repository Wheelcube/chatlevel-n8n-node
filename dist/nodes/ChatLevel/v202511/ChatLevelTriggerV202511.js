"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelTriggerV202511 = void 0;
const trigger_1 = require("../base/trigger");
const EVENTS = [
    { name: 'Call', value: 'call' },
    { name: 'Connection Auth', value: 'connection.auth' },
    { name: 'Connection Closed', value: 'connection.closed' },
    { name: 'Connection Logout', value: 'connection.logout' },
    { name: 'Connection Open', value: 'connection.open' },
    { name: 'Connection Timeout', value: 'connection.timeout' },
    { name: 'Message Deleted', value: 'message.deleted' },
    { name: 'Message Received', value: 'message.received' },
    { name: 'Message Sent', value: 'message.sent' },
    { name: 'Message Updated', value: 'message.updated' },
];
class ChatLevelTriggerV202511 {
    constructor() {
        this.description = {
            displayName: 'ChatLevel Trigger',
            name: 'chatLevelTriggerV202511',
            group: ['trigger'],
            version: 1,
            description: 'Trigger for ChatLevel events with separate branches',
            defaults: { name: 'ChatLevel Trigger' },
            inputs: [],
            outputs: ['main'], // Single placeholder; actual branches are defined by workflowData
            credentials: [],
            webhooks: [
                { name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' },
            ],
            properties: [], // No multiOptions property
        };
        // Use WAHA-style webhook for branching
        this.webhook = (0, trigger_1.makeWebhookForEvents)(EVENTS);
    }
}
exports.ChatLevelTriggerV202511 = ChatLevelTriggerV202511;
