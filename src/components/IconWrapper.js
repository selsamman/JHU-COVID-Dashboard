import React from 'react';
import {Col, Navbar, Row} from "react-bootstrap";

export const IconWrapperToolbar = (props) =>
    <span className="COVID_Icon_Wrapper" >
        {React.cloneElement(props.children, { color: "black"})}
    </span>

export const IconWrapperHeader = (props) =>
    <span className="COVID_Icon_Wrapper_Header" >
        {React.cloneElement(props.children, { color: "white"})}
    </span>



