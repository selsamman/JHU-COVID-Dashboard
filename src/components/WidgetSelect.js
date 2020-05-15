import React from "react";
import {widgetsAPI} from "../capi";
import {widgetConfig, widgetNames} from "../config/widgets";
import {Dropdown} from "react-bootstrap";

const WidgetSelect = ({id, scale}) => {
    const {doneEditing, deleteWidget, setLayoutMode} = widgetsAPI({id: id}, WidgetSelect);
        return (
            <div className="WidgetSelector">
                <SelectType id={id} scale={scale}/>
            </div>
    )
};
const SelectType = ({id, scale}) => {
    const {widget, setWidgetData} = widgetsAPI({id: id}, SelectType);
    return (
        <Dropdown size="lg">
            <Dropdown.Toggle variant="secondary" size="sm" style={{fontSize: 14 * scale, padding: 4}}>
                {widgetConfig[widget.type].name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {widgetNames.map(w =>
                    <Dropdown.Item
                        onSelect={() => {setWidgetData({type:w})}}
                        key={w}
                        active={w == widget.type}
                        eventKey={w} >{widgetConfig[w].name}
                    </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default WidgetSelect;
