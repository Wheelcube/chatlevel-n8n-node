"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLevelApi = void 0;
class ChatLevelApi {
    constructor() {
        this.name = 'chatLevelApi';
        this.displayName = 'ChatLevel API';
        this.documentationUrl = 'https://docs.chatlevel.io';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'API key authentication. You can create an API key in Chatlevel under Integrations -> Add integration -> n8n',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.chatlevel.io/v1',
                url: '/devices',
                method: 'GET',
            },
        };
    }
}
exports.ChatLevelApi = ChatLevelApi;
