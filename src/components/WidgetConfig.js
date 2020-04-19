import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {widgetConfig, isWidgetValid} from "../config/widgets";
import {Row, Col, Table} from 'react-bootstrap';
import {widgetsAPI} from "../capi";
import {CaretLeftFill, CaretRightFill, ChevronBarLeft, ChevronBarRight, ChevronBarDown, ChevronBarUp, CaretDownFill, CaretUpFill} from "react-bootstrap-icons";
const debug = false;

export default ({id, children, scale}) => {
    const {widget, isConfiguringData, isConfiguringLayout,anyConfiguring, widgetCountries} = widgetsAPI({id: id});
    const config = widgetConfig[widget.type];

    return (
        <>
            {debug && anyConfiguring && <DebugInfo widget={widget} />}
            {isConfiguringLayout &&
                <div style={{backgroundColor: "#f4f4f4", padding: 2 * scale, paddingBottom: 4 * scale,
                    marginBottom: 4 * scale, borderRadius: 4 * scale}}>
                    <WidgetConfigSize id={id} scale={scale}/>
                </div>
            }
            {isConfiguringData && (widget.cols > 2) &&
             config.config.map((config, ix) =>
                <WidgetConfigElement config={config} id={id} key={ix} scale={scale}/>
            )}
             {widgetCountries.length > 0 && children}
        </>
    );
};

const WidgetConfigElement = ({id, config, scale}) => {
    const {widget} = widgetsAPI({id: id});
    return (
        <div style={{backgroundColor: "#f4f4f4", padding: 8, marginBottom: 4, borderRadius: 4}}>
            <config.component {...config.props} widgetConfig={widgetConfig[widget.type]} id={id} scale={scale} />
        </div>
    );
}

const WidgetConfigSize = ({id, scale}) => {

    const {canContractWidgetHeight, canExpandWidgetHeight, canContractWidgetWidth, canExpandWidgetWidth,
           contractWidgetHeight, expandWidgetHeight, contractWidgetWidth, expandWidgetWidth,
             canMoveWidgetLeft, canMoveWidgetRight, moveWidgetLeft,  moveWidgetRight,
             canMoveWidgetDown, canMoveWidgetUp, moveWidgetDown, moveWidgetUp, widget} =  widgetsAPI({id: id});
    return (
    <Row style={{padding: 0, height: 24 * scale}}>
        <Col xs={2} className="d-flex justify-content-start">
            <MoveTool iconComponent={CaretLeftFill} enabled={canMoveWidgetLeft} click={moveWidgetLeft} scale={scale} />
            <MoveTool iconComponent={CaretUpFill} enabled={canMoveWidgetUp} click={moveWidgetUp} scale={scale} />
         </Col>
        <Col xs={4} className="d-flex justify-content-center">
            <MoveTool iconComponent={ChevronBarUp} enabled={canContractWidgetHeight} click={contractWidgetHeight} scale={scale} />
            <DataPoint description="rows" data={widget.rows} scale={scale} />
            <MoveTool iconComponent={ChevronBarDown} enabled={canExpandWidgetHeight} click={expandWidgetHeight} scale={scale} />
        </Col>
        <Col xs={4} className="d-flex justify-content-center">
             <MoveTool iconComponent={ChevronBarLeft} enabled={canContractWidgetWidth} click={contractWidgetWidth} scale={scale} />
            <DataPoint description="cols" data={widget.cols} scale={scale} />
            <MoveTool iconComponent={ChevronBarRight} enabled={canExpandWidgetWidth} click={expandWidgetWidth} scale={scale} />
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
            <MoveTool iconComponent={CaretDownFill} enabled={canMoveWidgetDown} click={moveWidgetDown} scale={scale} />
            <MoveTool iconComponent={CaretRightFill} enabled={canMoveWidgetRight} click={moveWidgetRight} scale={scale} />

        </Col>
    </Row>
    )
}

const MoveTool = ({enabled, iconComponent, click, scale}) => {
    const component = {iconComponent};
    return (
        <span>
            <component.iconComponent color={enabled ? "#000000" : "#b0b0b0"} onClick={() => enabled && click()} size={16 * scale} />
        </span>
    )
}
const DataPoint = ({description, data, scale}) => (
    <div style={{marginLeft: 4, marginRight: 4, paddingTop: 5}}>
        <div style={{fontSize: 7 * scale, textAlign: 'center', color: "#000000", lineHeight: 0.8}} >
            {data}
        </div>
        <div style={{fontSize: 7 * scale, textAlign: 'center', color: "#404040"}} >
            {description}
        </div>
    </div>
)
const DebugInfo = ({widget}) => (
    <Row style={{padding: 4, fontSize: 12}}>
        <Col>id: {widget.id}</Col>
        <Col>row: {widget.row}</Col>
        <Col>col: {widget.col}</Col>
        <Col>rows: {widget.rows}</Col>
        <Col>cols: {widget.cols}</Col>
    </Row>
);
