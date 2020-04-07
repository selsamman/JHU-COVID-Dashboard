import React from 'react';
import { widgetsAPI } from "../capi";
import {scale, widgetConfig} from '../config/widgets';
import {Row, Col} from 'react-bootstrap';
import {last} from "../data/timeseries";
import {Check, Gear, PlusCircleFill} from 'react-bootstrap-icons';
import {writeStateToURL} from "../config/urlParameters";

export const Dashboard = () => {
    const {widgetRows, widgets} = widgetsAPI({});

    return (
        <Col>
            <Row><Col><Header/></Col></Row>
            {widgetRows.map((widgetRow, row) => <WidgetRow key={row} row={row} />)}
            {false && <Row><Col>{JSON.stringify(widgets)}</Col></Row>}
        </Col>
    )
}

const WidgetRow = ({row})=> {
    const {widgetCols} = widgetsAPI({row: row});
    return (
        <Row xl={2} lg={2} md={2} sm={1} xs={1}>
            {
                widgetCols.map((widget, ix) => {
                    const config =  widgetConfig[widget.type];
                    const WidgetComponent = config.component;
                    return (
                        <Col key={ix}>
                            <WidgetComponent config={config} key={widget.id} id={widget.id} ix={ix}/>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

const Header = () => {
    const {widgets, editWidget, newWidget, anyConfiguring, doneEditing} = widgetsAPI({});
    writeStateToURL(widgetsAPI.getState());
    return (
        <Row style={{height: 40, borderBottom: "1px solid #e0e0e0", marginBottom: 20,marginTop: 10}}>
            <Col xs={6}>
                {anyConfiguring
                    ? <span>Click on any widget to edit</span>
                    : <span style={{fontSize: 20}}>Configurable Dashboard for JHU Data</span>
                }
            </Col>
            <Col xs={4}>
                {anyConfiguring &&
                    <span>Data as of {last}</span>}
            </Col>
            <Col xs={2}>
                {!anyConfiguring &&
                    <PlusCircleFill size={30} onClick={newWidget} color="#22ac63" />
                }
                &nbsp;
                {!anyConfiguring &&
                    <Gear size={30} onClick={()=>{editWidget(widgets[0].id)}} />
                }
                {anyConfiguring &&
                    <Check size={30} onClick={doneEditing} />
                }

            </Col>
        </Row>
    );
}


