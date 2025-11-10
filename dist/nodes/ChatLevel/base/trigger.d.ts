import { INodeProperties, INodeTypeDescription, IWebhookFunctions, IWebhookResponseData } from 'n8n-workflow';
export declare const BASE_TRIGGER_DESCRIPTION: Partial<INodeTypeDescription>;
export declare const TRIGGER_DESCRIPTION: Partial<INodeTypeDescription>;
export declare const CONFIGURE_WEBHOOK_NOTE: INodeProperties;
interface EventConfig {
    value: string;
    displayName: string;
    description?: string;
}
export declare function makeEventNote(eventConfigs: EventConfig[]): INodeProperties;
export declare function makeWebhookForEvents(events: string[]): (this: IWebhookFunctions) => Promise<IWebhookResponseData>;
export {};
