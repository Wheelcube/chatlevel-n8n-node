import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class ChatLevelTrigger implements INodeType {
	description: INodeTypeDescription = {
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
		credentials: [
			{
				name: 'chatLevelApi',
				required: true,
			},
		],
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
						name: 'Connection Opened',
						value: 'connection.open',
						description: 'Triggers when a connection is opened',
					},
					{
						name: 'Connection Closed',
						value: 'connection.closed',
						description: 'Triggers when a connection is closed',
					},
					{
						name: 'Connection Authentication',
						value: 'connection.auth',
						description: 'Triggers on connection authentication events',
					},
					{
						name: 'Connection Timeout',
						value: 'connection.timeout',
						description: 'Triggers when a connection times out',
					},
					{
						name: 'Connection Logout',
						value: 'connection.logout',
						description: 'Triggers when a connection is logged out',
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
						name: 'Message Deleted',
						value: 'message.deleted',
						description: 'Triggers when a message is deleted',
					},
					{
						name: 'Call',
						value: 'call',
						description: 'Triggers on call events',
					},
				],
				default: [],
				required: true,
				description: 'The events to listen to',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const events = this.getNodeParameter('events') as string[];

		// Get the event type from the webhook payload
		const eventType = bodyData.event as string;

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