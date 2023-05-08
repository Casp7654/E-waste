// export Type TableInfo
export type TableInfo = {
    selector: string;
    description: string;
    endpoint: string;
    refreshInterval?:number
    // size
    maxHeight?:string;
    // Overridden by Client-side lib
    labels?: string[];
    values?: Array<string[]>;
};