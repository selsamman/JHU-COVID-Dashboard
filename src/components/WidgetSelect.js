import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {widgetsAPI} from "../capi";
import {widgetConfig, widgetNames} from "../config/widgets";
import {Dropdown, DropdownButton, Row, Col, Container, Button, ButtonGroup} from "react-bootstrap";
import {scale} from "../config/widgets";
import {writeStateToURL} from "../config/urlParameters";

export default ({id}) => {
    const {doneEditing, deleteWidget, setLayoutMode} = widgetsAPI({id: id});
        return (
            <div>
                <SelectType id={id} />
            </div>
    )
};
const SelectType = ({id}) => {
    const {widget, setWidgetData} = widgetsAPI({id: id});
    return (
        <Dropdown >
            <Dropdown.Toggle
                style={{border: 0, backgroundColor: "#e8e8e8", color: "#202020", fontSize: 10 * scale, padding: 4}}
                size={scale > 1 ? "lg" : "sm"}
            >
                {widgetConfig[widget.type].name}
            </Dropdown.Toggle>
            <Dropdown.Menu
                onSelect={(type) => {alert('foo')}}
            >
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
