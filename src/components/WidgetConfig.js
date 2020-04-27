import React, {useState} from 'react';
import {dataSet} from "../data/timeseries";
import {widgetConfig} from "../config/widgets";
import {Row, Col, Table} from 'react-bootstrap';
import {widgetsAPI} from "../capi";
import {CaretLeftFill, CaretRightFill, ChevronBarLeft, ChevronBarRight, ChevronBarDown, ChevronBarUp, CaretDownFill, CaretUpFill} from "react-bootstrap-icons";
const debug = false && document.location.origin.match(/localhost/);

export default ({id, children, scale, mode}) => {
    const {widget, isConfiguringData, isConfiguringLayout,anyConfiguring, widgetCountries, widgetProps} = widgetsAPI({id: id});
    const config = widgetConfig[widget.type];

    return (
        <>
            {debug && anyConfiguring && <DebugInfo widget={widget} mode={mode}/>}
            {isConfiguringLayout &&
                <div style={{backgroundColor: "#f4f4f4", padding: 2 * scale, paddingBottom: 4 * scale,
                    marginBottom: 4 * scale, borderRadius: 4 * scale}}>
                    <WidgetConfigSize id={id} scale={scale}/>
                </div>
            }
            {isConfiguringData  &&
                <div className="WidgetConfigGroup">
                    {config.config.map((config, ix) =>
                        <WidgetConfigElement config={config} id={id} key={ix} scale={scale}/>
                     )}
                </div>
             }
             {widgetCountries.length > 0 && widgetProps.length > 0 &&
                children
             }
        </>
    );
};

const WidgetConfigElement = ({id, config, scale}) => {
    const {widget} = widgetsAPI({id: id});
    return (
        <div  className="WidgetConfigElement">
            <config.component {...widgetConfig[widget.type]} countries={dataSet.countries} id={id} scale={scale} />
        </div>
    );
}

const WidgetConfigSize = ({id, scale}) => {

    const {canContractWidgetHeight, canExpandWidgetHeight, canContractWidgetWidth, canExpandWidgetWidth,
           contractWidgetHeight, expandWidgetHeight, contractWidgetWidth, expandWidgetWidth,
             canMoveWidgetLeft, canMoveWidgetRight, moveWidgetLeft,  moveWidgetRight,
             canMoveWidgetDown, canMoveWidgetUp, moveWidgetDown, moveWidgetUp, widget} =  widgetsAPI({id: id});
    const narrow = widget.cols < 2 ? 12 : 2;
    const wide = widget.cols < 2 ? 12 : 4;

    return (
    <Row style={{padding: 0, minHeight: 24 * scale}}>
        <Col xs={narrow} className="d-flex justify-content-start">
            <MoveTool iconComponent={CaretLeftFill} enabled={canMoveWidgetLeft} click={moveWidgetLeft} scale={scale} />
            <MoveTool iconComponent={CaretUpFill} enabled={canMoveWidgetUp} click={moveWidgetUp} scale={scale} />
         </Col>
        <Col xs={wide} className="d-flex justify-content-center">
            <MoveTool iconComponent={ChevronBarUp} enabled={canContractWidgetHeight} click={contractWidgetHeight} scale={scale} />
            <DataPoint description="rows" data={widget.rows} scale={scale} />
            <MoveTool iconComponent={ChevronBarDown} enabled={canExpandWidgetHeight} click={expandWidgetHeight} scale={scale} />
        </Col>
        <Col xs={wide} className="d-flex justify-content-center">
             <MoveTool iconComponent={ChevronBarLeft} enabled={canContractWidgetWidth} click={contractWidgetWidth} scale={scale} />
            <DataPoint description="cols" data={widget.cols} scale={scale} />
            <MoveTool iconComponent={ChevronBarRight} enabled={canExpandWidgetWidth} click={expandWidgetWidth} scale={scale} />
        </Col>
        <Col xs={narrow} className="d-flex justify-content-end">
            <MoveTool iconComponent={CaretDownFill} enabled={canMoveWidgetDown} click={moveWidgetDown} scale={scale} />
            <MoveTool iconComponent={CaretRightFill} enabled={canMoveWidgetRight} click={moveWidgetRight} scale={scale} />

        </Col>
    </Row>
    )
}

export const MoveTool = ({enabled, iconComponent, click, scale}) => {
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
const DebugInfo = ({widget, mode}) => {
    const [width, setWidth] = useState(-1);
    return (
        <Row style={{padding: 4, fontSize: 12}} ref={n=>n && setWidth(n.offsetWidth)} >
            <Col>id: {widget.id}</Col>
            <Col>row: {widget.row}</Col>
            <Col>col: {widget.col}</Col>
            <Col>rows: {widget.rows}</Col>
            <Col>cols: {widget.cols}</Col>
            <Col>width: {width}</Col>
            <Col>mode: {mode}</Col>
        </Row>
    );
}
