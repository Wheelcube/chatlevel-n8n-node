import { INodeTypeBaseDescription, VersionedNodeType } from 'n8n-workflow';
import { ChatLevelTriggerV1 } from './v1/ChatLevelTriggerV1';

export class ChatLevelTrigger extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Chatlevel Trigger',
			name: 'chatLevelTrigger',
			icon: 'file:chatlevel.svg',
			group: ['trigger'],
			description: 'Handle Chatlevel events via webhooks',
			defaultVersion: 1,
		};

		const nodeVersions = {
			1: new ChatLevelTriggerV1(),
		};

		super(nodeVersions, baseDescription);
	}
}