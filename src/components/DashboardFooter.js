import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {widgetsAPI} from "../capi";
export const DashboardFooter = ({mode}) =>  {
    const fontStyle = {fontSize: mode === 'table' ? 12 : 8};
    const {widgetNotes} = widgetsAPI({}, DashboardFooter)
    return (
        <>
            {
                <div style={{padding: 20, lineHeight: 1, fontSize: 11}}>
                    {widgetNotes.map((n, ix) => <span key={ix}>{n}&nbsp;</span>)}
                    <span>Dotted lines represent 14 day moving averages.</span>
                </div>
            }
            <Navbar bg="dark" variant="dark" sticky="bottom">
                <Navbar.Brand><span style={{display: "inline-block", ...fontStyle, marginTop: -10, textTransform: "uppercase", fontWeight: "bold"}}>&copy; 2020 magixIT LLC V1.12</span></Navbar.Brand>
                 <Navbar.Collapse className="justify-content-end">
                     <Nav >
                         <Nav.Link href="https://coronavirus.jhu.edu/" target="_blank" style={fontStyle}>Data from John's Hopkins</Nav.Link>
                         <Nav.Link href="https://github.com/selsamman/JHU-COVID-Dashboard" target="_blank" style={fontStyle}>Source Code</Nav.Link>
                         <Nav.Link href="mailto:support@magixit.com" target="_blank" style={fontStyle}>Contact Support</Nav.Link>
                         <Nav.Link href="mailto:support@magixit.com" target="_blank" style={fontStyle}>Contact Press</Nav.Link>
                     </Nav>
                 </Navbar.Collapse>
            </Navbar>
        </>
    );
};
