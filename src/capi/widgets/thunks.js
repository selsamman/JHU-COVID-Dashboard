import {dataSet} from "../../data/timeseries";
import {save} from "../../config/localstorage";

export default {

    editWidget: ({id, widgets, setWidgetBeingEdited, widgetBeingConfiguredId}) => (xid) => {
        if (xid)
            setWidgetBeingEdited(xid);
        else if (id)
            setWidgetBeingEdited(id);
        else if (widgets.find(w => w.id === widgetBeingConfiguredId))
            setWidgetBeingEdited(widgetBeingConfiguredId)
        else
            setWidgetBeingEdited(widgets[0].id);
    },

    addCountryToWidget: ({widget, addVerifiedCountryToWidget, getCountryData}) => (newCountry) => {
        if (!widget.countries.includes(newCountry) && getCountryData(newCountry))
            addVerifiedCountryToWidget(newCountry);
    },

    addSingleCountryToWidget: ({setWidgetData, widget,getCountryData}) => (newCountry) => {
        if (getCountryData(newCountry))
            setWidgetData({countries: [newCountry].concat(widget.countries.slice(1))});
    },
    addSinglePropToWidget: ({setWidgetData, widget}) => (newProp) => {
        setWidgetData({props: [newProp].concat(widget.props.slice(1))});
    },
    newWidget: ({addWidgetToMatrix, widgets, nextRow, setWidgetBeingEdited, setDataMode, nextWidgetId,anyConfiguring }) => () => {
        const widget = widgets.filter( w => w.cols >= 3 && w.type === 'Blank').sort((a, b) => a.row - b.row)[0];
        if (typeof widget !== 'undefined')
            nextWidgetId = widget.id;
        else {
            addWidgetToMatrix(nextRow, 0);
            addWidgetToMatrix(nextRow, 6);
        }
        setWidgetBeingEdited(nextWidgetId);
        if (!anyConfiguring)
            setDataMode()
    },

    deleteWidget: ({id, deleteWidgetFromMatrix, widgetMatrix, widget, setWidgetData}) => () => {
        deleteWidgetFromMatrix(id);
        widgetMatrix[widget.row].map( widgetCol => {
            if (widgetCol.col > widget.col)
                setWidgetData({col: widgetCol.col - 1}, widgetCol.id)
        });
    },

    swapWidget: ({setWidgetData}) => (widget, dest) => {
        setWidgetData({col: dest.col, row: dest.row, cols: dest.cols, rows:dest.rows}, widget.id);
        setWidgetData({col: widget.col, row: widget.row, cols: widget.cols, rows:widget.rows}, dest.id);
    },

    moveWidgetLeft: ({widget, swapWidget, widgetLeftNeighbor}) => () => {
        if (widgetLeftNeighbor)
            swapWidget(widget, widgetLeftNeighbor);
    },

    moveWidgetRight: ({widget, swapWidget, widgetRightNeighbor}) => () => {
        if (widgetRightNeighbor)
            swapWidget(widget, widgetRightNeighbor);
    },

    moveWidgetUp: ({widget, swapWidget, widgetUpperNeighbor}) => () => {
        if (widgetUpperNeighbor)
            swapWidget(widget, widgetUpperNeighbor);
    },

    moveWidgetDown: ({widget, swapWidget, widgetLowerNeighbor}) => () => {
        if (widgetLowerNeighbor)
            swapWidget(widget, widgetLowerNeighbor);
    },

    contractWidgetHeight: ({id, addWidgetToMatrix, widget, setWidgetData, widgetMatrix}) => () => {
        setWidgetData({rows: widget.rows - 1});
        addWidgetToMatrix(widget.row + widget.rows - 1, widget.col, 1, widget.cols);
    },

    expandWidgetHeight: ({widget, setWidgetData, deleteWidgetFromMatrix, widgetLowerBlankOrContractableNeighbor : dest}) => () => {
        setWidgetData({rows: widget.rows + 1})
        if (dest.rows > 1)
            setWidgetData({rows: dest.rows - 1, row: dest.row + 1}, dest.id)
        else
            deleteWidgetFromMatrix(dest.id);
    },

    contractWidgetWidth: ({id, addWidgetToMatrix, widget, widgets, setWidgetData}) => () => {
        setWidgetData({cols: widget.cols - 1});
        const dest = widgets.find(w =>
            w.row === widget.row && // Same row
            w.rows === widget.rows &&
            w.col === widget.col + widget.cols) // Next column
        if (dest)
            setWidgetData({col: dest.col - 1, cols: dest.cols + 1}, dest.id)
        else
            addWidgetToMatrix(widget.row, widget.col + widget.cols - 1, widget.rows, 1);
    },

    expandWidgetWidth: ({widget, deleteWidgetFromMatrix, setWidgetData, widgetBlankOrContractableNeighbor : dest}) => () => {
        if (dest.col > widget.col)
            setWidgetData({cols: widget.cols + 1});
        else
            setWidgetData({col: widget.col - 1, cols: widget.cols + 1});
        if (dest.cols > 1) {
            if (dest.col > widget.col)
                setWidgetData({cols: dest.cols - 1, col: dest.col + 1}, dest.id)
            else
                setWidgetData({cols: dest.cols - 1}, dest.id)
        } else
            deleteWidgetFromMatrix(dest.id);

    },
}
