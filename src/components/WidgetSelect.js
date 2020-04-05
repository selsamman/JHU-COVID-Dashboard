import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {widgetsAPI} from "../capi";
import {widgetConfig, widgetNames} from "../config/widgets";
import {Dropdown, DropdownButton, Row, Col, Container, Button} from "react-bootstrap";
import { Trash, Check, CaretLeftFill, CaretRightFill, CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import {scale} from "../config/widgets";

export default ({id}) => {
    const {doneEditing, deleteWidget} = widgetsAPI({id: id});
    return (
        <div>
            <Row>
                <Col md={3}>
                    <PositionButton id={id} arrow="left" />
                    <PositionButton id={id} arrow="right" />
                    <PositionButton id={id} arrow="up" />
                    <PositionButton id={id} arrow="down" />
                </Col>
                <Col md={7}><SelectType id={id} /></Col>
                <Col md={2}>
                    <Trash size={16 * scale} onClick={deleteWidget} />
                    <Check size={16 * scale} onClick={doneEditing} />
                </Col>
            </Row>
        </div>
    )
};
const PositionButton = ({id, arrow}) => {
    const {widget, setWidgetData, moveWidget, widgetMatrix} = widgetsAPI({id: id});
    const enabled = {
        left: widget.col > 0,
        right: widget.col < (widgetMatrix[widget.row].length - 1),
        up: widget.row > 0,
        down: widget.row < (widgetMatrix.length - 1)
    }[arrow];
    const Caret = {
        left: CaretLeftFill,
        right: CaretRightFill,
        up: CaretUpFill,
        down: CaretDownFill
    }[arrow];
    const onClick = () => {
        if (enabled)
            moveWidget(arrow)
    }
    const color = enabled ? "#000000" : "#e0e0e0";
    return (
        <Caret size={16 * scale} color={color} onClick={onClick} />
    )
}
const SelectType = ({id}) => {
    const {widget, setWidgetData} = widgetsAPI({id: id});
    return (
        <Dropdown>
            <Dropdown.Toggle
                style={{border: 0, backgroundColor: "transparent", color: "#202020", fontSize: 12 * scale, padding: 4}}
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
