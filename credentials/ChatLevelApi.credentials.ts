import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatLevelApi implements ICredentialType {
	name = 'chatLevelApi';
	displayName = 'ChatLevel API';
	documentationUrl = 'https://docs.chatlevel.io';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your ChatLevel API key',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.chatlevel.io/v1',
			description: 'Base URL for the ChatLevel API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl || "https://api.chatlevel.io/v1"}}',
			url: '/devices',
			method: 'GET',
		},
	};
}
