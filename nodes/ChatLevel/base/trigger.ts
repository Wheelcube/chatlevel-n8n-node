import {
	INodeProperties,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export const BASE_TRIGGER_DESCRIPTION: Partial<INodeTypeDescription> = {
	displayName: 'Chatlevel Trigger',
	name: 'chatLevelTrigger',
	icon: 'file:chatlevel.svg',
	group: ['trigger'],
	description: 'Handle Chatlevel events via webhooks',
};

export const TRIGGER_DESCRIPTION: Partial<INodeTypeDescription> = {
	defaults: {
		name: 'Chatlevel Trigger',
	},
	inputs: [],
	credentials: [],
	webhooks: [
		{
			name: 'default',
			httpMethod: 'POST',
			responseMode: 'onReceived',
			path: 'chatlevel',
		},
	],
};

export const CONFIGURE_WEBHOOK_NOTE: INodeProperties = {
	displayName:
		'Remember to configure Chatlevel to send events to <b>Webhook URL</b>. ' +
		'<br/>Each event type will output to its corresponding branch.',
	name: 'webhookNote',
	type: 'notice',
	typeOptions: {
		theme: 'info',
	},
	default: '',
};

interface EventConfig {
	value: string;
	displayName: string;
	description?: string;
}

function noteText(eventConfigs: EventConfig[]): string {
	const parts = ['<b>Event Branches</b>:'];
	for (const event of eventConfigs) {
		const desc = event.description ? ` - ${event.description}` : '';
		parts.push(`<b>${event.displayName}</b>: <code>${event.value}</code>${desc}`);
	}
	return parts.join('<br/>');
}

export function makeEventNote(eventConfigs: EventConfig[]): INodeProperties {
	return {
		displayName: noteText(eventConfigs),
		name: 'eventsNote',
		type: 'notice',
		typeOptions: {
			theme: 'info',
		},
		default: '',
	};
}

export function makeWebhookForEvents(events: string[]) {
	async function webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const eventType = bodyData.event as string | undefined;

		// If no event type or unknown event, don't trigger
		if (eventType === undefined || !events.includes(eventType)) {
			return {};
		}

		// Find which output branch this event corresponds to
		const eventIndex: number = events.indexOf(eventType);
		const req = this.getRequestObject();

		// Prepare the data
		const data = this.helpers.returnJsonArray(req.body);

		// Create empty arrays for all outputs
		const empty: any[] = [];
		const workflowData = events.map((_) => empty);

		// Put data only in the branch for this event
		workflowData[eventIndex] = data;

		return {
			workflowData: workflowData,
		};
	}

	return webhook;
}