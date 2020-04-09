import {widgetsAPI} from "../index";

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
    nextRow: [
        (select, {widgets}) => select(widgets),
        (widgets) => widgets.reduce( (currMax, widget) => Math.max(currMax, widget.row + widget.rows), 0),
    ],
    widgetRows: (state, {widgetMatrix}) => widgetMatrix,
    widgetCols: (state, {widgetMatrix, row}) => widgetMatrix[row],
    widget: [
        (select, {widgets, id}) => select(widgets, id),
        (widgets, id) => widgets.find(w => (w.id === id))
    ],
    nextWidgetId: state => state.nextWidgetId,
    widgetBeingConfiguredId: state => state.widgetBeingConfiguredId,
    editMode: state => state.editMode,
    isConfiguring: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode !== "none",
    isConfiguringLayout: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode === "layout",
    isConfiguringData: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode === "data",
    anyConfiguring:  (state) => state.editMode !== "none",
    anyConfiguringLayout: (state, {id}) => state.editMode === "layout",
    anyConfiguringData: (state, {id}) => state.editMode === "data",

    canMoveWidgetLeft: (state, {widgetLeftNeighbor}) => typeof widgetLeftNeighbor !== 'undefined',
    widgetLeftNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w =>
            w.col === widget.col - widget.cols && w.row <= widget.row).sort((a,b)=> a.col - b.col)[0]
    ],
    canMoveWidgetRight: (state, {widgetRightNeighbor}) => typeof widgetRightNeighbor !== 'undefined',
    widgetRightNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w => w.col === widget.col + widget.cols && w.row <= widget.row).sort((a,b)=> a.col - b.col)[0]
    ],
    canMoveWidgetUp: (state, {widgetUpperNeighbor}) => typeof widgetUpperNeighbor !== 'undefined',
    widgetUpperNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w => widget.row === w.row + w.rows && w.col === widget.col).sort((a,b)=> a.row - b.row)[0]
    ],
    canMoveWidgetDown: (state, {widgetLowerNeighbor}) => typeof widgetLowerNeighbor !== 'undefined',
    widgetLowerNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w => w.row === (widget.row + widget.rows) && w.col === widget.col).sort((a,b)=> a.row - b.row)[0]
    ],
    canContractWidgetHeight: [
        (select, {widget}) => select(widget),
        (widget) => widget.rows > 1
    ],
    canExpandWidgetHeight: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.find(w => // Look down from here for blank row in same column to gobble up
            w.type === 'Blank' && w.col === widget.col && w.cols === widget.cols && w.row >= (widget.row + widget.rows))
    ],
    canContractWidgetWidth: [
        (select, {widget}) => select(widget),
        (widget) => widget.cols > 3
    ],
    canExpandWidgetWidth: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => true
    ],

}
