export default {
    widgets: state => state.widgets,
    widgetMatrix: [
        (select, {widgets}) => select(widgets),
        (widgets) => {
            const matrix = [];
            widgets.map( w => {
                matrix[w.row] = matrix[w.row] || [];
                matrix[w.row][w.col] = w;
            });

            for (let ix = 0; ix < matrix.length; ++ix)
                if (typeof matrix[ix] === 'undefined')
                    matrix[ix] = [];

            return matrix
        }
    ],
    widgetRows: (state, {widgetMatrix}) => widgetMatrix,
    widgetCols: (state, {widgetMatrix, row}) => widgetMatrix[row],
    widget: [
        (select, {widgets, id}) => select(widgets, id),
        (widgets, id) => widgets.find(w => (w.id === id))
    ],

    widgetBeingConfiguredId: state => state.widgetBeingConfiguredId,
    isConfiguring: (state, {id}) => state.widgetBeingConfiguredId === id,
    anyConfiguring:  (state) => state.widgetBeingConfiguredId === -1,
}
