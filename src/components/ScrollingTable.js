import styled from "styled-components";
import React from "react";

const scroll= (e, key) =>  {
    if (e && e.target && key) {
        window.__ScrollingTable__ = window.__ScrollingTable__ || {};
        window.__ScrollingTable__[key] = e.target.scrollTop;
        console.log(`${key} = ${e.target.scrollTop}`);
    }
}
const setDefaultScrolling = (ref, key) => {

    if (ref && window.__ScrollingTable__ && window.__ScrollingTable__[key]) {
        ref.scrollTop = window.__ScrollingTable__[key];
        console.log(`${window.__ScrollingTable__[key]}`);
    }
}


const Table = ({className, height, headerHeight, enable, children, id}) => (
    <div className={className} >
        {enable !== false &&
            <div className="ScrollingTableContainer" style={{height: height}}>
                <div className="ScrollingTableHeader" style={{height: headerHeight}}>
                    <div className="ScrollingInnerTableHeader" >
                        {children}
                    </div>
                </div>
                <div className="ScrollingTableBody"
                     style={{top: headerHeight, maxHeight: height - headerHeight}}
                     ref={(ref) => setDefaultScrolling(ref, id)}
                     onScroll={(e) => scroll (e, id)}>
                    {children}
                </div>
            </div>
        }
        {enable === false &&
            <>
                {children}
            </>
        }
    </div>
)

const ScrollingTable = styled(Table)`
        & .ScrollingTableContainer {
            position: relative;
            margin-bottom: 20px;
        }
        & .ScrollingTableBody {
            margin: 0;
            position: absolute;
            overflow-y: scroll;
            width: 100%;
            border: 1px solid #dee2e6;
        }
        & .ScrollingTableHeader {
            margin: 0;
            position: absolute;
            overflow: hidden;
            width: 100%;
        }
        & .ScrollingInnerTableHeader {
            overflow-y: scroll
        }
        & .ScrollingTableHeader table {
            margin-bottom: 0;
        }
        & .ScrollingTableHeader table thead {
            border: 0;
        }
        & .ScrollingTableBody table thead {
            visibility: hidden;
        }
        & .ScrollingTableBody table {
            border: 0
        }
        & .ScrollingTableHeader table tbody {
            visibility: hidden;
        }
        & .ScrollingTableHeader table thead th, .ScrollingTableBody table thead th {
            height: ${props => props.headerHeight}px;
        };
        & .ScrollingTableBody table {
            margin-top: -${props => props.headerHeight}px;
        };`

export const scrollIntoView = (ref) => {
    let container;
    let child = ref;
    while (ref.parentNode) {
        if (ref.className === 'ScrollingTableBody') {
            container = ref;
            break;
        }
        ref = ref.parentNode;
    }
    return;
    if (child && container)
        console.log(child.offsetTop + " " + child.offsetHeight + " " + container.clientHeight);
    if (child && container && (container.scrollTop + child.offsetTop + child.offsetHeight) >
                              (container.clientHeight - container.offsetTop))
        container.scrollTop = Math.max(0, child.offsetTop - container.clientHeight + child.offsetHeight - container.offsetTop)
}
export default ScrollingTable;
