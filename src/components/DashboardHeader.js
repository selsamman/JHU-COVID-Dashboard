import {widgetsAPI} from "../capi";
import {writeStateToURL} from "../config/urlParameters";
import {Col, Navbar, Row, Container} from "react-bootstrap";
import {dateRange} from "../data/timeseries";
import {Check, Gear, PlusCircleFill, Grid3x3} from "react-bootstrap-icons";
import React from "react";
import ReactBreakpoints from "react-breakpoints";
import {IconWrapperHeader} from "./IconWrapper";

export const DashboardHeader = () => {
    const {widgets, editWidget, newWidget, anyConfiguring, doneEditing, anyConfiguringLayout, anyConfiguringData, isConfiguringData, setLayoutMode, setDataMode} = widgetsAPI({});
    writeStateToURL(widgetsAPI.getState());
    console.log("widget count needed to re");
    return (
        <Navbar fixed="top" bg="dark" variant="dark" style={{height: 40}}>
            <Navbar.Brand>COVID-19 Configurable Dashboard</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                { anyConfiguring &&
                    <Navbar.Text>
                        <IconWrapperHeader><PlusCircleFill size={24} onClick={newWidget}/></IconWrapperHeader>
                        {anyConfiguringLayout &&
                        <IconWrapperHeader><Gear size={20} onClick={()=>{setDataMode();editWidget()}} /></IconWrapperHeader>
                        }
                        {anyConfiguringData &&
                        <IconWrapperHeader><Grid3x3 size={20} onClick={()=>{setLayoutMode();editWidget()}} /></IconWrapperHeader>
                        }
                        <IconWrapperHeader><Check size={20} onClick={doneEditing} /></IconWrapperHeader>
                    </Navbar.Text>
                }
                {!anyConfiguring &&
                    <Navbar.Text>
                        <span style={{fontSize: 14}}>JHU data as of {dateRange.last}</span>&nbsp;&nbsp;
                        <IconWrapperHeader><Gear size={20} onClick={()=>{setDataMode();editWidget()}} /></IconWrapperHeader>
                    </Navbar.Text>
                 }
            </Navbar.Collapse>
        </Navbar>
    );
}
const DataPoint = ({description, data}) => (
    <span style={{marginLeft: 4, marginRight: 4,display: "inline-block", padding: 0}}>
        <span style={{fontSize: 10 , textAlign: 'center', color: "white"}} >
            {description}
        </span>
        <span style={{fontSize: 10, textAlign: 'center', color: "white", lineHeight: 0.8}} >
            {data}
        </span>
    </span>
)


