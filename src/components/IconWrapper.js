import React from 'react';
import {Col, Navbar, Row} from "react-bootstrap";

export const IconWrapperToolBar = (props) =>
    <span className="COVID_Icon_Wrapper" >
        {React.cloneElement(props.children, { color: "white"})}
    </span>
export const IconWrapperHeader = (props) =>
    <span className="COVID_Icon_Wrapper_Header" >
        {React.cloneElement(props.children, { color: "white"})}
    </span>



