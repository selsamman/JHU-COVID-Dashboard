import {widgetsAPI} from "../capi";
import {writeStateToURL} from "../config/urlParameters";
import {Col, Navbar, Row, Container} from "react-bootstrap";
import {last} from "../data/timeseries";
import {Check, Gear, PlusCircleFill, Grid3x3} from "react-bootstrap-icons";
import React from "react";
import ReactBreakpoints from "react-breakpoints";
import {IconWrapperHeader} from "./IconWrapper";

export const DashboardHeader = () => {
    const {widgets, editWidget, newWidget, anyConfiguring, doneEditing, anyConfiguringLayout, anyConfiguringData, isConfiguringData, setLayoutMode, setDataMode} = widgetsAPI({});
    writeStateToURL(widgetsAPI.getState());
    return (
        <Navbar fixed="top" bg="dark" variant="dark" style={{height: 36}}>
            <Navbar.Brand>COVID-19 Data</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>

                    <IconWrapperHeader><PlusCircleFill size={24} onClick={newWidget}/></IconWrapperHeader>
                    {(!anyConfiguring || anyConfiguringLayout) &&
                        <IconWrapperHeader><Gear size={20} onClick={()=>{setDataMode();editWidget()}} /></IconWrapperHeader>
                    }
                    {(!anyConfiguring || anyConfiguringData) &&
                        <IconWrapperHeader><Grid3x3 size={20} onClick={()=>{setLayoutMode();editWidget()}} /></IconWrapperHeader>
                    }
                    {anyConfiguring &&
                        <IconWrapperHeader><Check size={20} onClick={doneEditing} /></IconWrapperHeader>
                    }
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}


