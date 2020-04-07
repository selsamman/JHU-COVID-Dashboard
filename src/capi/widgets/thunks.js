import {countryHash} from "../../data/timeseries";

export default {
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

    newWidget: ({widgetMatrix, addWidgetToMatrix}) => () => {
        const row = widgetMatrix.find( row => {
            return row.length < 2}
            );
        if (typeof row !== 'undefined')
            addWidgetToMatrix(row[0].row, widgetMatrix[row[0].row].length)
        else
            addWidgetToMatrix(widgetMatrix.length, 0);
    },

    deleteWidget: ({id, deleteWidgetFromMatrix, widgetMatrix, widget, setWidgetData}) => () => {
        deleteWidgetFromMatrix(id);
        widgetMatrix[widget.row].map( widgetCol => {
            if (widgetCol.col > widget.col)
                setWidgetData({col: widgetCol.col - 1}, widgetCol.id)
        });
    },

    moveWidget: ({widget, widgetMatrix, setWidgetData, insertRow}) => (direction) => {

        switch (direction) {
            case 'up':
                setWidgetData({row: widget.row - 1, col: 0});
                if (widgetMatrix[widget.row - 1].length > 1)
                    insertRow(0)
                else
                    widgetMatrix[widget.row - 1].map ( widgetCol => {
                        if (widgetCol.col > 0)
                            setWidgetData({col: widgetCol.col + 1}, widgetCol.id)
                    })
                break;

            case 'down':

                if (widgetMatrix[widget.row + 1].length > 1) {
                    insertRow(widget.row + 1);
                    setWidgetData({row: widget.row + 1, col: 0});
                } else {
                    setWidgetData({row: widget.row + 1, col: 0});
                    widgetMatrix[widget.row + 1].map ( widgetCol => {
                        if (widgetCol.col > 0)
                            setWidgetData({col: widgetCol.col + 1}, widgetCol.id)
                    })
                }
                break;

            case 'left':
                setWidgetData({col: widget.col - 1});
                widgetMatrix[widget.row].map ( widgetCol => {
                    if (widgetCol.col === widget.col - 1)
                        setWidgetData({col: widgetCol.col + 1}, widgetCol.id)
                });
                break;

            case 'right':
                setWidgetData({col: widget.col + 1});
                widgetMatrix[widget.row].map ( widgetCol => {
                    if (widgetCol.col === widget.col + 1)
                        setWidgetData({col: widgetCol.col - 1}, widgetCol.id)
                });
                break;
        }
    }
}
