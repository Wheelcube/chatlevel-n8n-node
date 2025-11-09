import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodeType, INodeTypeDescription, INodeListSearchResult } from 'n8n-workflow';
export declare class ChatLevelText implements INodeType {
    methods: {
        listSearch: {
            getDevices(this: ILoadOptionsFunctions): Promise<INodeListSearchResult>;
        };
    };
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
