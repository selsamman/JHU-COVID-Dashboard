import {initialDashboard, initialWidget} from "./initialState";
import {save} from "../config/localstorage";
import {updateLocation} from "../config/locationData";
import {dataSet} from "../data/timeseries";

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
            },
            currentDashboardName: {
                set: () => name,
            }
        }),
        setDashboardByIx: (dashboardIx) => ({
            currentDashboardIx: {
                set: () => dashboardIx,
            },
            currentDashboardName: {
                set: (state) => state.dashboards[dashboardIx].name,
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
            },
            currentDashboardName: {
                set: () => name,
            },
            widgetBeingConfiguredId: {
                set: () => dashboardTemplate ? dashboardTemplate.widgets[0].id : initialDashboard.widgets[0].id
            }
        }),
        deleteDashboard: (deleteIx) => ({
            dashboards: {
                where: (state, item, ix) => ix === deleteIx,
                delete: true
            },

        }),
        setLocationDenied: () => ({
            locationStatus: {
                set: () => "denied"
            }
        }),
        setLocationFetched: () => ({
            locationStatus: {
                set: () => "fetched"
            }
        }),
        setLocationNeeded: () => ({
            locationStatus: {
                set: () => "ask"
            }
        }),
        setCountrySubstitution: (country, value) => ({
            substitutionCountries: {
                assign: () => ({[country]: value})
            }
        })
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
        locationStatus: state => state.locationStatus,
        askForLocation: state => state.locationStatus === "ask",
        fetchLocation: state => state.locationStatus === "fetch",
        locationInit: state => state.locationStatus === "init",
        dataSet: () => dataSet,
        substitutionCountries: state => state.substitutionCountries,

    },
    thunks: {
        getCountryData: ({substituteCountry, dataSet}) => (country) => dataSet.country[substituteCountry(country)],
        substituteCountry: ({substitutionCountries}) => (country) => substitutionCountries[country] || country,
        makeDashboardCustom: ({name, dashboards, dashboard, addDashboard, setDashboardByName, setCustom}) => () => {

            let newName = "My " + name;
            while(dashboards.find(d => d.name === newName)) {
                const match = newName.match(/\d+$/)
                if (match)
                    newName = newName.replace(/\d+$/, (value) => value * 1 + 1)
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
        getLocationData: (api) => async () => await updateLocation(api),
    }
}
