"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const ChatLevelTriggerV1_1 = require("./v1/ChatLevelTriggerV1");
class ChatLevelTrigger extends n8n_workflow_1.VersionedNodeType {
    constructor() {
        const baseDescription = {
            displayName: 'Chatlevel Trigger',
            name: 'chatLevelTrigger',
            icon: 'file:chatlevel.svg',
            group: ['trigger'],
            description: 'Handle Chatlevel events via webhooks',
            defaultVersion: 1,
        };
        const nodeVersions = {
            1: new ChatLevelTriggerV1_1.ChatLevelTriggerV1(),
        };
        super(nodeVersions, baseDescription);
    }
}
exports.ChatLevelTrigger = ChatLevelTrigger;
