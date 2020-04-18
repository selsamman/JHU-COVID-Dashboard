import {initialDashboard, initialWidget} from "./initialState";
import {save} from "../config/localstorage";
import {getDashboardFromURL, getURL} from "../config/urlParameters";
import {cursorContainerMixin} from "victory";
import {setCurrentDashboard} from "../config/dashboardCookies";

export default {
    redactions: {
        doneEditing: () => ({
            editMode: {
                set: () => "none",
            }
        }),

        setDataMode: () => ({
            editMode: {
                set: (state) => "data"
            }
        }),
        setLayoutMode: () => ({
            editMode: {
                set: (state) => "layout"
            }
        }),
        setWidgetBeingEdited: (id) => ({
            widgetBeingConfiguredId: {
                set: () => id,
            }
        }),
        setDashboardByName: (name) => ({
            currentDashboardIx: {
                set: state => state.dashboards.findIndex( (dashboard) => name === dashboard.name)
            }
        }),
        setDashboardByIx: (dashboardIx) => ({
            currentDashboardIx: {
                set: () => dashboardIx,
            }
        }),
        addDashboard: (name, dashboardTemplate) => ({
            dashboards: {
                append: () => dashboardTemplate ? {
                    ...dashboardTemplate,
                    widgets: dashboardTemplate.widgets.map(widget => ({
                        ...widget,
                        props: widget.props.slice(0),
                        countries: widget.countries.slice(0)
                    })),
                    name: name,
                } : initialDashboard
            },
            currentDashboardIx: {
                set: (state) => state.dashboards.length,
            }
        }),
        deleteDashboard: (deleteIx) => ({
            dashboards: {
                where: (state, item, ix) => ix === deleteIx,
                delete: true
            },

        }),
    },
    selectors: {
        widgetBeingConfiguredId: state => state.widgetBeingConfiguredId,
        editMode: state => state.editMode,
        isConfiguring: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode !== "none",
        isConfiguringLayout: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode === "layout",
        isConfiguringData: (state, {id}) => state.widgetBeingConfiguredId === id && state.editMode === "data",
        anyConfiguring:  (state) => state.editMode !== "none",
        anyConfiguringLayout: (state, {id}) => state.editMode === "layout",
        anyConfiguringData: (state, {id}) => state.editMode === "data",
        dashboards: state => state.dashboards,
    },
    thunks: {
        makeDashboardCustom: ({name, dashboards, dashboard, addDashboard, setDashboardByName, setCustom}) => () => {

            let newName = "My " + name;
            while(dashboards.find(d => d.name === newName)) {
                const match = newName.match(/\d+$/)
                if (match)
                    newName.replace(/\d+$/, (value) => value * 1 + 1)
                else
                    newName += " 1";
            }
            addDashboard(newName, dashboard);
            setDashboardByName(newName);
            setCustom();
        },
        removeDashboard: ({currentDashboardIx, deleteDashboard, setDashboardByIx, isDashboardCustom}) => () => {
            if (isDashboardCustom) {
                deleteDashboard(currentDashboardIx);
                setDashboardByIx(0)
            }
        },
        persistState: ({}, state) => () => save(state),
    }
}
