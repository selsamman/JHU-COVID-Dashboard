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

    addCountryToWidget: ({addVerifiedCountryToWidget, getCountryData}) => (newCountry) => {
        if (getCountryData(newCountry, true))
            addVerifiedCountryToWidget(newCountry);
    },

    addSingleCountryToWidget: ({addVerifiedCountryToWidget, deleteCountryFromWidget, widget,getCountryData}) => (newCountry) => {
        if (getCountryData(newCountry, true)) {
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

    expandWidgetWidth: ({widget, deleteWidgetFromMatrix, setWidgetData, widgetRightBlankOrContractableNeighbor : dest}) => () => {
        setWidgetData({cols: widget.cols + 1});
        if (dest.cols > 1)
            setWidgetData({cols: dest.cols - 1, col: dest.col + 1}, dest.id)
        else
            deleteWidgetFromMatrix(dest.id);

    },

    validateWidget: ({widget, widgets, getCountryData}) => () => {
        for (let w in widgets) {
            const widget = widgets[w];
            let countryCount = widget.countries.length;
            widget.countries.map(c => {
                if (getCountryData(c, true))
                    widget.props.map(p => {
                        if (typeof dataSet.country[c][p] === 'undefined') {
                            console.log(`In widget ${w} ${p} not found`);
                        }
                    })
                else {
                    console.log(`In widget ${w} ${c} not found`);
                    //deleteCountryFromWidget(c, widget.id);
                    //--countryCount
                    //alert(c + " is no longer in the JHU database.  Maybe the name changed - try adding it again");
                }
            })
        }
    },

}
