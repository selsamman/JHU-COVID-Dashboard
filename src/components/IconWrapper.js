import React from 'react';
import {Tooltip, OverlayTrigger} from "react-bootstrap";

export const IconWrapperToolbar = (props) =>
    <span className="COVID_Icon_Wrapper" >
        {React.cloneElement(props.children, { color: "black"})}
    </span>

export const IconWrapperHeader = (props) =>
    <>
        {props.tooltip &&
            <>
                <OverlayTrigger
                    key={btoa(props.tooltip)}
                    placement={props.position || "left"}
                    overlay={
                        <Tooltip id={`tooltip-${btoa(props.tooltip)}`}>
                            {props.tooltip}
                        </Tooltip>
                    }
                >
                <span className="COVID_Icon_Wrapper_Header"  style={{cursor: "pointer"}}>
                    {React.cloneElement(props.children, { color: props.color || "white"})}
                </span>
                </OverlayTrigger>{' '}
            </>
        }
        {!props.tooltip &&
            <span className="COVID_Icon_Wrapper_Header" style={{cursor: "pointer"}}>
                {React.cloneElement(props.children, { color: props.color || "white"})}
            </span>
        }
    </>


