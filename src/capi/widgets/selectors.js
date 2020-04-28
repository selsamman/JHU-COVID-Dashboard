import {widgetsAPI} from "../index";
import {widgetConfig} from "../../config/widgets";

export default {
    widgets: state => state.widgets,

    nextWidgetId: state => state.nextWidgetId,

    widgetMatrix: [
        (select, {widgets}) => select(widgets),
        (widgets) => {
            const matrix = [];
            if (!widgets)
                return [];
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
        (widgets, id) => widgets ? widgets.find(w => (w.id === id)) : undefined
    ],
    widgetCountries: [
        (select, {widget, substitutionCountries, dataSet, dashboardSelectedLocation}) =>
            select(widget, substitutionCountries, dataSet, dashboardSelectedLocation),
        (widget, substitutionCountries, dataSet, dashboardSelectedLocation) => !widget ? [] :
            [...new Set(widget.countries
                .map( c => (c === "Selected Location"
                    ? dashboardSelectedLocation || "United States" : substitutionCountries[c] || c))
                .filter( c => !!dataSet.country[c] ))].sort()

    ],
    widgetProps: [
        (select, {widget, dataSet}) => select(widget, dataSet),
        (widget) => {
            if (!widget)
                return [];
            const config = widgetConfig[widget.type]
            if (config.dataPoint)
                return config.dataPoint;
            if (config.dataPoints) {
                const points = widget.props.filter(p => Object.getOwnPropertyNames(config.dataPoints).includes(p))
                return points.length > 0 ? points : (config.defaultDataPoint ? [config.defaultDataPoint] : [])
            }
            return [];
        }
    ],
    widgetConfigCountries: [
        (select, {widget, substitutionCountries}) => select(widget, substitutionCountries),
        (widget, substitutionCountries) => widget.countries
    ],
    canMoveWidgetLeft: (state, {widgetLeftNeighbor}) => !!widgetLeftNeighbor ,
    widgetLeftNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w =>
            widget.col === w.col + w.cols && // Must start horizontally immediately before
            w.row <= widget.row)
            .sort((a,b)=> b.row - a.row)[0]
    ],
    canMoveWidgetRight: (state, {widgetRightNeighbor}) => !!widgetRightNeighbor,
    widgetRightNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w =>
            w.col === widget.col + widget.cols && // Must start horizontally where this widget leaves off
            w.row <= widget.row) // And in a lower row
            .sort((a,b)=> b.row - a.row)[0]
    ],
    canMoveWidgetUp: (state, {widgetUpperNeighbor}) => !!widgetUpperNeighbor,
    widgetUpperNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w => widget.row === w.row + w.rows && w.col === widget.col).sort((a,b)=> a.row - b.row)[0]
    ],

    canMoveWidgetDown: (state, {widgetLowerNeighbor}) => !!widgetLowerNeighbor,

    widgetLowerNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.filter(w =>
            w.row === (widget.row + widget.rows) && // Must start horizontally where this widget leaves off
            w.col === widget.col)
            .sort((a,b)=> a.row - b.row)[0]
    ],

    canContractWidgetHeight: [
        (select, {widget}) => select(widget),
        (widget) => widget.rows > 1
    ],

    canExpandWidgetHeight: (state, {widgetLowerBlankOrContractableNeighbor}) => !! widgetLowerBlankOrContractableNeighbor,

    widgetLowerBlankOrContractableNeighbor: [
        (select, {widget, widgets}) => select(widget, widgets),
        (widget, widgets) => widgets.find(w =>
            (w.type === 'Blank' || w.rows > 1) && // Blank or contractable
            w.col === widget.col && // starting in the same column
            w.cols === widget.cols && // Same width
            w.row === (widget.row + widget.rows)) // Next row
    ],

    canContractWidgetWidth: [
        (select, {widget}) => select(widget),
        (widget) => widget.cols > 3
    ],

    widgetBlankOrContractableNeighbor: [
            (select, {widget, widgets}) => select(widget, widgets),
            (widget, widgets) => widgets.find(w => // Look right from here blank row in same column to gobble up
                (w.type === 'Blank' || w.cols > 1) && // Blank or contractable
                w.row === widget.row &&
                w.rows === widget.rows &&
                ((w.col === widget.col + widget.cols) || (widget.col + widget.cols === 12 && w.col + w.cols === widget.col)))
    ],
    canExpandWidgetWidth: (state, {widgetBlankOrContractableNeighbor}) => !!widgetBlankOrContractableNeighbor

}
