export const setHeader = (chart, labels) => {
    chart.data.labels = labels
    chart.update();
}

export const updateData = (chart, datasets) => {
    chart.data.datasets = [];
    for (const dataset of datasets) {
        if (dataset.backgroundColor === undefined) {
            dataset.backgroundColor = [];
            for (const value of dataset.data) {
                dataset.backgroundColor.push(defaultColor);
            }
        }
        if (dataset.borderColor === undefined) {
            dataset.borderColor = [];
            for (const value of dataset.data) {
                dataset.borderColor.push(defaultColorBorder);
            }
        }
        if (dataset.borderWidth === undefined) {
            dataset.borderWidth = defaultBorderwidth;
        }
        chart.data.datasets.push(dataset);
    }
    chart.update('none');
}


const defaultColor = 'rgba(75, 192, 192, 0.2)';
const defaultColorBorder = 'rgb(75, 192, 192)';
const defaultBorderwidth = 1;