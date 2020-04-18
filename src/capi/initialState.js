export function upgrade(state) {  // DONT FORGET TO UPDATE THIS!!!
    if (state.schemaVersion < 3) {
        state = initialState;
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
    nextWidgetId: 3,
    dashboardType: "custom",
    name: "My " + defaultDashboardName,
    widgets: [
        {...initialWidget},
        {...initialWidget, id: 3, col: 6, type: "Blank"}
    ]
}

const initialState = {
    schemaVersion: 3,
    widgetBeingConfiguredId: -1,
    editMode: "none",
    currentDashboardIx: 0,
    dashboards : [
        {
            nextWidgetId: 7,
            dashboardType: "stock",
            name: defaultDashboardName,
            widgets: [
                {
                    id: 1,
                    type: "DataForCountry",
                    countries: ["My Country" ],
                    row: 0, col: 0,
                    rows: 1, cols: 3,
                    props: ["cases", "deaths"],
                },
                {
                    id: 2,
                    type: "DataForCountry",
                    countries: ["The Whole World"],
                    row: 0,
                    col: 3,
                    rows: 1, cols: 3,
                    props: ["deaths", "cases"],
                },
                {
                    id: 3,
                    type: "DataByCountry",
                    countries: ["My County", "My Country",  "My State",  "The Whole World"],
                    row: 1,
                    col: 0,
                    rows: 1, cols: 6,
                    props: ["deaths", "cases", "deathsPerM", "casesPerM"],
                },
                {
                    id:4,
                    type: "NewCasesPerPopulationOverTime",
                    countries: ["My County", "My Country",  "My State",  "The Whole World"],
                    row: 0,
                    col: 6,
                    rows: 2, cols: 6,
                    props: [],
                },
                {
                    id: 5,
                    type: "CasesPerPopulationOverTime",
                    countries: ["My County", "My Country",  "My State",  "The Whole World"],
                    row: 2,
                    col: 0,
                    rows: 1, cols: 4,
                    props: [],
                },
                {
                    id: 6,
                    type: "DeathsPerPopulationOverTime",
                    countries: ["My County", "My Country",  "My State",  "The Whole World"],
                    row: 2,
                    col: 4,
                    rows: 1, cols: 4,
                    props: [],
                },
                {
                    id: 7,
                    type: "NewDeathsPerPopulationOverTime",
                    countries: ["My County", "My Country",  "My State",  "The Whole World"],
                    row: 2,
                    col: 8,
                    rows: 1, cols: 4,
                    props: [],
                },
            ]
        }
     ]
}
export default initialState;
