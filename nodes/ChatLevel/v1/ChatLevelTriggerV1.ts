import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {
	CONFIGURE_WEBHOOK_NOTE,
	makeEventNote,
	makeWebhookForEvents,
} from '../base/trigger';

// Define all available events with their display names and descriptions
const EVENT_CONFIG = [
	{ 
		value: 'call', 
		displayName: 'Call',
		description: 'Triggers when a call is received'
	},
	{ 
		value: 'connection.auth', 
		displayName: 'Auth',
		description: 'Device authentication occurs'
	},
	{ 
		value: 'connection.closed', 
		displayName: 'Closed',
		description: 'Connection is closed'
	},
	{ 
		value: 'connection.logout', 
		displayName: 'Logout',
		description: 'Device logs out'
	},
	{ 
		value: 'connection.open', 
		displayName: 'Open',
		description: 'Connection opens'
	},
	{ 
		value: 'connection.timeout', 
		displayName: 'Timeout',
		description: 'Connection times out'
	},
	{ 
		value: 'message.deleted', 
		displayName: 'Msg Deleted',
		description: 'Message is deleted'
	},
	{ 
		value: 'message.received', 
		displayName: 'Msg Received',
		description: 'Message is received'
	},
	{ 
		value: 'message.sent', 
		displayName: 'Msg Sent',
		description: 'Message is sent'
	},
	{ 
		value: 'message.updated', 
		displayName: 'Msg Updated',
		description: 'Message is updated'
	},
];

const EVENTS = EVENT_CONFIG.map(e => e.value);
const outputs = EVENTS.map(() => 'main' as const);
const outputNames = EVENT_CONFIG.map(e => e.displayName);

export class ChatLevelTriggerV1 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Chatlevel Trigger',
		name: 'chatLevelTrigger',
		icon: 'file:chatlevel.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle Chatlevel events via webhooks',
		defaults: {
			name: 'Chatlevel Trigger',
		},
		inputs: [],
		outputs: outputs,
		outputNames: outputNames,
		credentials: [],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'chatlevel',
			},
		],
		properties: [
			CONFIGURE_WEBHOOK_NOTE,
			makeEventNote(EVENT_CONFIG),
		],
	};

	webhook = makeWebhookForEvents(EVENTS);
}