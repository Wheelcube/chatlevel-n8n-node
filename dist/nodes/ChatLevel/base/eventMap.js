"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHATLEVEL_EVENTS = void 0;
// Map of ChatLevel events with internal value and display name
exports.CHATLEVEL_EVENTS = [
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
