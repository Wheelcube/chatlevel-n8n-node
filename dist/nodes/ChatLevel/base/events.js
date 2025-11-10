"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHATLEVEL_EVENTS = void 0;
exports.CHATLEVEL_EVENTS = [
    {
        name: 'Call',
        value: 'call',
        description: 'Triggers when a call is received',
    },
    {
        name: 'Connection Auth',
        value: 'connection.auth',
        description: 'Triggers when device authentication occurs',
    },
    {
        name: 'Connection Closed',
        value: 'connection.closed',
        description: 'Triggers when connection is closed',
    },
    {
        name: 'Connection Logout',
        value: 'connection.logout',
        description: 'Triggers when device logs out',
    },
    {
        name: 'Connection Open',
        value: 'connection.open',
        description: 'Triggers when connection opens',
    },
    {
        name: 'Connection Timeout',
        value: 'connection.timeout',
        description: 'Triggers when connection times out',
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
];
