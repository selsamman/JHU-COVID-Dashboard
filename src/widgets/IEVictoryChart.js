import {VictoryChart} from "victory";
import React from "react";

// A hack to make victory charts work with IE

 const IEVictoryChart = (props) => (
    <div style={{height: props.height}}>
        <div style={{ position: 'relative', height: 0, width: '100%', padding: 0, paddingBottom: `${100 * (props.height / props.width)}%` }}>
            <VictoryChart {...props} style={{ ...props.style, parent: { position: 'absolute', height: '100%', width: '100%', left: 0, top: 0 } }} />
        </div>
    </div>
);

export default IEVictoryChart;
