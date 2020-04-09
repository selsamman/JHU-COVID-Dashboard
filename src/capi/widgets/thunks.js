import {countryHash} from "../../data/timeseries";
import {widgetsAPI} from "../index";

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

    addCountryToWidget: ({addVerifiedCountryToWidget}) => (newCountry) => {
        if (countryHash[newCountry])
            addVerifiedCountryToWidget(newCountry);
    },
    addSingleCountryToWidget: ({addVerifiedCountryToWidget, deleteCountryFromWidget, widget}) => (newCountry) => {
        if (countryHash[newCountry]) {
            widget.countries.map( country => deleteCountryFromWidget(country) );
            addVerifiedCountryToWidget(newCountry);
        }
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
        console.log(`contracted ${widget.id}`);
    },
    expandWidgetHeight: ({id, widgets, widgetMatrix, widget, setWidgetData, deleteWidgetFromMatrix, addWidgetToMatrix, nextRow}) => () => {
        setWidgetData({rows: widget.rows + 1})
        const dest = widgets.filter(w => // Look down from here blank row in same column to gobble up
            w.type === 'Blank' && w.col === widget.col && w.cols === widget.cols && w.row >= (widget.row + widget.rows))
            .sort((a,b)=> a.row - b.row)[0]; // and take the first
        if (dest)
                deleteWidgetFromMatrix(dest.id);
         console.log(`expanded ${widget.id}`);
    },
    contractWidgetWidth: ({id, addWidgetToMatrix, widget, widgets, setWidgetData}) => () => {
        setWidgetData({cols: widget.cols - 1});
        const dest = widgets.find(w => w.type === 'Blank' && w.row === widget.row && w.rows === widget.rows)
        if (dest)
            setWidgetData({col: dest.col - 1, cols: dest.cols + 1}, dest.id)
        else
            addWidgetToMatrix(widget.row, widget.col + widget.cols, widget.rows, 1);
    },
    expandWidgetWidth: ({id, widgetMatrix, widget, widgets, setWidgetData, deleteWidgetFromMatrix}) => () => {
        setWidgetData({cols: widget.cols + 1});
        const dest = widgets.find(w => w.type === 'Blank' && w.row === widget.row && w.rows === widget.rows)
        if (dest.cols > 1)
            setWidgetData({col: dest.col + 1, cols: dest.cols - 1}, dest.id)
        else
            deleteWidgetFromMatrix(dest.id);
        console.log(`expanded ${widget.id} ${dest.cols === 1 ? "deleting " + dest.id : "by adding row"}`);
    }
}
