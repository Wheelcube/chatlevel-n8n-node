"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIGURE_WEBHOOK_NOTE = exports.TRIGGER_DESCRIPTION = exports.BASE_TRIGGER_DESCRIPTION = void 0;
exports.makeEventNote = makeEventNote;
exports.makeWebhookForEvents = makeWebhookForEvents;
exports.BASE_TRIGGER_DESCRIPTION = {
    displayName: 'Chatlevel Trigger',
    name: 'chatLevelTrigger',
    icon: 'file:chatlevel.svg',
    group: ['trigger'],
    description: 'Handle Chatlevel events via webhooks',
};
exports.TRIGGER_DESCRIPTION = {
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
exports.CONFIGURE_WEBHOOK_NOTE = {
    displayName: 'Remember to configure Chatlevel to send events to <b>Webhook URL</b>. ' +
        '<br/>Each event type will output to its corresponding branch.',
    name: 'webhookNote',
    type: 'notice',
    typeOptions: {
        theme: 'info',
    },
    default: '',
};
function noteText(eventConfigs) {
    const parts = ['<b>Event Branches</b>:'];
    for (const event of eventConfigs) {
        const desc = event.description ? ` - ${event.description}` : '';
        parts.push(`<b>${event.displayName}</b>: <code>${event.value}</code>${desc}`);
    }
    return parts.join('<br/>');
}
function makeEventNote(eventConfigs) {
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
function makeWebhookForEvents(events) {
    async function webhook() {
        const bodyData = this.getBodyData();
        const eventType = bodyData.event;
        // If no event type or unknown event, don't trigger
        if (eventType === undefined || !events.includes(eventType)) {
            return {};
        }
        // Find which output branch this event corresponds to
        const eventIndex = events.indexOf(eventType);
        const req = this.getRequestObject();
        // Prepare the data
        const data = this.helpers.returnJsonArray(req.body);
        // Create empty arrays for all outputs
        const empty = [];
        const workflowData = events.map((_) => empty);
        // Put data only in the branch for this event
        workflowData[eventIndex] = data;
        return {
            workflowData: workflowData,
        };
    }
    return webhook;
}
