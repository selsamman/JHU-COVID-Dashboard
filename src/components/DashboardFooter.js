import React, {useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
export const DashboardFooter = ({mode}) =>  {
    const fontStyle = {fontSize: mode === 'table' ? 12 : 8};
    return (
        <Navbar bg="dark" variant="dark" sticky="bottom">
            <Navbar.Brand><span style={{display: "inline-block", ...fontStyle, marginTop: -10, textTransform: "uppercase", fontWeight: "bold"}}>&copy; 2020 magixIT LLC V1.02</span></Navbar.Brand>
             <Navbar.Collapse className="justify-content-end">
                 <Nav >
                     <Nav.Link href="https://coronavirus.jhu.edu/" target="_blank" style={fontStyle}>Data from John's Hopkins</Nav.Link>
                     <Nav.Link href="mailto:support@magixit.com" style={fontStyle}>Contact Support</Nav.Link>
                     <Nav.Link href="mailto:support@magixit.com" style={fontStyle}>Contact Press</Nav.Link>
                 </Nav>
             </Navbar.Collapse>
        </Navbar>
    );
};
