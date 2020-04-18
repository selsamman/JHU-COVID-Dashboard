import Cookies from 'js-cookie';
import {uncompressState, compressState} from "./urlParameters";
import {defaultDashboardName} from "../capi/initialState";

let defaultDashboard;
export function getDashboards() {
    const dashboardNames=document.cookie
        .split(";").map(c => c.split("=")[0])
        .filter(c => c.match(/^covid_dashboard/));
    return dashboardNames.map(d => uncompressState(Cookies.get(d))).concat([defaultDashboardName]);
}
export function saveDashboard(dashboard) {
    const key="covid_dashboard_" + atob(dashboard.name);
    Cookies.set(key, compressState(dashboard));
}
export function removeDashboard(dashboard) {
    const key="covid_dashboard_" + atob(dashboard.name);
    Cookies.remove(key);
}
export function setCurrentDashboard(dashboardName) {
    Cookies.set("covid_current_dashboard", atob(dashboardName));
}
export function getCurrentDashboard() {
    return btoa(Cookies.get("covid_current_dashboard"));
}
export function getDashboard(dashboardName) {
    return getDashboards().find(f => f.name === dashboardName);
}
function clearCookies () {
    getDashboards().map(d => removeDashboard(d.name))
    Cookies.remove("covid_current_dashboard");
}
export function getInitialState(initialState) {
    if (new URLSearchParams(document.location.search).get("init"))
        clearCookies();
    const currentDashboard = getCurrentDashboard();
    let dashboard = currentDashboard ? getDashboard(currentDashboard) : null;
    return dashboard || initialState;
}

