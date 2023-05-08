import type { ChartTypeRegistry } from "chart.js/auto";

// Prop Type Declarations
export type ChartInfo = {
    selector: string;
    description: string;
    endpoint: string;
    type: keyof ChartTypeRegistry;
    refreshInterval?: number
    // size
    maxHeight?: string;
    // Overridden by Client-side lib
    labels?: string[]
    values?: ChartDataSet[] // values are overridden
};

export type ChartConfig = {
    type: keyof ChartTypeRegistry;
    data: {
        labels: string[];
        datasets: ChartDataSet[];
    };
    options: object;
};

export type ChartDataSet = {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
};

export const generateChartConfig = (info: ChartInfo, options?: object): ChartConfig => {
    const config: ChartConfig = {
        type: info.type,
        data: {
            labels: [],
            datasets: [],
        },
        options: options || {},
    };
    return config;
};
