import {getDashboardFromURL} from "./urlParameters";
import {adjustName} from "../capi/dashboard";
import {upgrade} from "../capi/initialState";

export function getInitialState(initialState) {
    const stateJSON = window.localStorage.getItem("state");
    let state = initialState;
    let startSchemaVersion = 0;
    if ((new URLSearchParams(document.location.search).get("init")) === 'all') {
        console.log("state cleared by init paramater");
        window.localStorage.setItem("state", JSON.stringify(initialState));

    } else if (!stateJSON) {
        console.log("no state found in local storage")
    } else {
        console.log("state found in local storage");
        state = JSON.parse(stateJSON);
        startSchemaVersion = state.schemaVersion;
        state = upgrade(state);
    }
    if ((new URLSearchParams(document.location.search).get("init")) === 'location')
        state.locationStatus = "init";

    state.newDashboards = false;
    updateStockDashboards(state, initialState);
    const newDashboard = getDashboardFromURL();
    if (newDashboard) {
        state.newDashboards = true;
        const sameNameIx = state.dashboards.findIndex(d => d.name === newDashboard.name);
        if (typeof sameNameIx === "number" && JSON.stringify(state.dashboards[sameNameIx]) === JSON.stringify(newDashboard)) {
            state.currentDashboardIx = sameNameIx;
            console.log(`identical dashboard found ${state.currentDashboardIx} ${newDashboard.name}`);
        } else {
            let name = newDashboard.name;
            while (state.dashboards.find(d => d.name === name)) {
                name = adjustName(name);
            }
            state.currentDashboardIx = state.dashboards.length;
            newDashboard.name = name;
            state.dashboards.push(newDashboard);
            console.log(`Added dashboard ${state.currentDashboardIx} ${newDashboard.name}`);
        }

    }
    state.editMode = "none";
    state.startupSequence = startSchemaVersion !== state.schemaVersion || state.newDashboards ? "init" : "done";
    save(state);
    console.log("state = " + JSON.stringify(state, null, 5));
    return state;
}
function updateStockDashboards(state, initialState) {
    initialState.dashboards
        .filter(d => d.dashboardType === "stock")
        .map( initialDashboard => {
            let existingIx = state.dashboards.findIndex(d => d.name === initialDashboard.name);
            const existingDashboard = state.dashboards[existingIx];
            if (existingDashboard && existingDashboard.dashboardType !== 'stock'){
                existingDashboard.name += " 1";
                existingIx = -1
            }
            if (existingIx >= 0) {
                if (JSON.stringify(state.dashboards[existingIx]) !== JSON.stringify(initialDashboard))
                    state.newDashboards = true;
                state.dashboards[existingIx] = initialDashboard;
            } else {
                state.dashboards.push(initialDashboard);
                state.newDashboards = true;
            }
        })
        state.currentDashboardIx = state.dashboards.findIndex(d => d.name === state.currentDashboardName);
        if (state.currentDashboardIx < 0)
            state.currentDashboardIx = 0;
        state.currentDashboardName = state.dashboards[state.currentDashboardIx].name;
}
export function save (state) {
    window.localStorage.setItem("state", JSON.stringify(state));
}
