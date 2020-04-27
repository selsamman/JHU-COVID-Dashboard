export function upgrade(state) {  // DONT FORGET TO UPDATE THIS!!!
    if (state.schemaVersion < 3) {
        state = initialState;
    }
    if (state.schemaVersion < 5) {
        state.currentDashboardName =  state.dashboards[0].name;
        state.currentDashboardIx = 0;
        delete state.substitutionCountries.substitutionCountries;
        delete state.currentDashBoardName;
        state.schemaVersion = 5;
        console.log("Upgrading to schema version " + 4);
    }
    return state;
}
export const defaultDashboardName = "COVID Dashboard";
export const initialWidget = {
    id: 1,
    type: "DataByCountry",
    row: 0, col: 0,
    rows: 1, cols: 6,
    props: ["cases", "deaths"],
    countries: ["My Country"],
}
export const initialDashboard = {
    nextWidgetId: 4,
    dashboardType: "custom",
    name: "My " + defaultDashboardName,
    widgets: [
        {...initialWidget},
        {...initialWidget, id: 3, col: 6, type: "Blank"}
    ]
}
const initialState = {
    schemaVersion: 5,
    widgetBeingConfiguredId: -1,
    editMode: "none",
    currentDashboardIx: 0,
    currentDashboardName: defaultDashboardName,
    locationStatus: "init",
    substitutionCountries: {
        "My Country": "United States"
    },
    dashboards: [
        {
            "nextWidgetId": 105,
            "dashboardType": "stock",
            "name": "COVID Dashboard",
            "widgets": [{
                "id": 1,
                "type": "DataForCountry",
                "countries": ["My Country"],
                "row": 0,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["cases", "deaths", "caseTrend", "deathTrend"]
            }, {
                "id": 3,
                "type": "DataByCountry",
                "countries": ["My County", "My Country", "My State", "The Whole World", "Spain", "Italy", "France", "Germany", "United Kingdom", "Belgium", "Turkey", "United States", "South Korea", "Iran", "Sweden", "Ireland"],
                "row": 0,
                "col": 5,
                "rows": 2,
                "cols": 7,
                "props": ["deaths", "cases", "deathsPerM", "caseTrend", "deathTrend"]
            }, {
                "id": 4,
                "type": "NewCasesOverTime",
                "countries": ["My Country"],
                "row": 1,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": ["mortalitySeverityOverTime"]
            }, {
                "id": 5,
                "type": "DeathsPerPopulationOverTime",
                "countries": ["My County", "My State", "United States", "Italy", "Spain", "My Country"],
                "row": 2,
                "col": 0,
                "rows": 1,
                "cols": 5,
                "props": []
            }, {
                "id": 6,
                "type": "WorldMap",
                "countries": ["My County", "My Country", "My State", "The Whole World"],
                "row": 2,
                "col": 5,
                "rows": 1,
                "cols": 7,
                "props": ["caseSeverityOverTime"]
            }]
        }]
}
export default initialState;
