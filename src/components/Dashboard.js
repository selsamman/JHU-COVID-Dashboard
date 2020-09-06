import React, {useState} from 'react';
import { widgetsAPI } from "../capi";
import {scale, widgetConfig, formatDate} from '../config/widgets';
import {Row, Col, Table} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import WidgetConfig from "./WidgetConfig";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import {dateToIx} from "../data/timeseries";

const mobileScale = .9;
const gridScaleBase = 1.5;
const gridScaleBaseMin = .8;
const gridScaleBaseMax = 1.2;
let timeout;
export const Dashboard = ({mode}) => {
    const {widgetRows, widgets, hasDateSlider, setToDate, dataSet, dashboard} = widgetsAPI({}, Dashboard);
    const [localDate, setLocalDate] = useState(dashboard.toDate || dataSet.dateRange.to)


    const dix = dateToIx(localDate);

    const setDate = value => {
        const date = new Date(dataSet.dateRange.from)
        date.setDate(date.getDate() + value)
        setLocalDate(date.getTime())
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout( () => {
            setToDate(date.getTime())
            timeout = undefined;
        }, 250)
    };
    if (mode === 'lg'  || mode  === 'xl' )
        return (
            <Col>
                {hasDateSlider &&
                    <Row>
                        <Col xs="2">
                            {formatDate(new Date(localDate))}
                        </Col>
                        <Col xs={10}>
                            <RangeSlider value={dix} min={0} max={dataSet.dates.length - 1}
                                         onChange={e => {setDate(Number(e.target.value))}} tooltip="off"
                            />
                        </Col>
                    </Row>
                }
                <Row><Col>
                    <Table borderless style={{tableLayout: "fixed", width: '100%'}}>
                        <colgroup>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                            <col width="8.33333333%"></col>
                        </colgroup>
                        <tbody>
                            {widgetRows.map((widgetRow, row) =>
                                <WidgetTableRow key={row} row={row} mode={mode}/>
                            )}
                        </tbody>
                    </Table>
                </Col></Row>
             </Col>
        )
    else
        return (
            <Col>
                {hasDateSlider &&
                <Row>
                    <Col xs="2" style={{fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {formatDate(new Date(localDate))}
                    </Col>
                    <Col xs={10}>
                        <RangeSlider value={dix} min={0} max={dataSet.dates.length - 1}
                                     onChange={e => {setDate(Number(e.target.value))}} tooltip="off"
                        />
                    </Col>
                </Row>
                }

                {widgetRows.map((widgetRow, row) =>
                        <WidgetRow key={row} row={row} mode={mode}/>
                    )}
                  {false && <Row><Col>{JSON.stringify(widgets)}</Col></Row>}
            </Col>
        )
}

const WidgetRow = ({row, mode})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row}, WidgetRow);
    return (
        <Row xl={2} lg={2} md={1} sm={1} xs={1}>
            {
                widgetCols.map((widget, ix) => {
                    return (
                        <Col key={ix} onClick={()=>{anyConfiguring && editWidget(widget.id)}}>
                            <Widget widget={widget} mode={mode} scale={mobileScale} ix={ix} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}
const WidgetTableRow = ({row, mode})=> {
    const {widgetCols, anyConfiguring, editWidget} = widgetsAPI({row: row}, WidgetTableRow);
    const scale = (widget) => Math.max(gridScaleBaseMin,(Math.min(gridScaleBaseMax, widget.cols * gridScaleBase / 6)));
    return (
        <tr >
            {
                widgetCols.map((widget, ix) => {
                    return (
                        <td key={ix} rowSpan={widget.rows} colSpan={widget.cols} width={(widget.cols * 100 / 12) + "%"}
                            onClick={()=>{anyConfiguring && editWidget(widget.id)}}
                            style={{borderWidth: anyConfiguring ? 1: 0, borderStyle: "dotted", borderColor:  "#808080"}}
                        >
                            <Widget widget={widget} mode={mode} scale={scale(widget)} ix={ix} />
                        </td>
                    )
                }
            )}
        </tr>
    )
}
const Widget = React.memo(({widget, mode, scale, ix}) => {
    const config =  widgetConfig[widget.type];
    const WidgetComponent = config.component;
    return (
        <WidgetConfig id={widget.id} mode={mode} scale={scale}>
            <WidgetComponent {...config} key={widget.id} id={widget.id} ix={ix}  mode={mode} scale={scale}/>
        </WidgetConfig>
    )
});


