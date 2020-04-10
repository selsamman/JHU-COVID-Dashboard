export function upgrade(state) {  // DONT FORGET TO UPDATE THIS!!!
    if (!state.schemaVersion) {
        state.schemaVersion = 1;
        state.widgets = state.widgets.map( widget => ({...widget, props: []}))
    }
    if (state.schemaVersion < 2) {
        state.editMode = "none";
        state.schemaVersion = 2;
    }
    return state;
}
export default {
    schemaVersion: 2,
    widgetBeingConfiguredId: -1,
    editMode: "none",
    nextWidgetId: 7,
    widgets: [
        {
            id: 1,
            type: "DataByCountry",
            countries: ["United States", "Italy", "Spain","China", "Germany", "Sweden", "South Korea" ],
            row: 0, col: 0,
            rows: 2, cols: 6,
            props: ["cases", "deaths", "casesPerM", "deathsPerM"],
        },
        {
            id: 2,
            type: "DataForCountry",
            countries: ["United States"],
            row: 0,
            col: 6,
            rows: 1, cols: 6,
            props: ["deaths", "cases", "deathsPerM", "casesPerM"],
        },
        {
            id: 3,
            type: "DataForCountry",
            countries: ["Ireland"],
            row: 1,
            col: 6,
            rows: 1, cols: 6,
            props: ["deaths", "cases", "deathsPerM", "casesPerM"],
        },
        {
            id:4,
            type: "CasesPerPopulationOverTime",
            countries: ["Ireland", "Germany",  "United States",  "United Kingdom"],
            row: 2,
            col: 0,
            rows: 3, cols: 4,
            props: [],
        },
        {
            id: 5,
            type: "DeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "United States",  "United Kingdom"],
            row: 2,
            col: 4,
            rows: 2, cols: 4,
            props: [],
        },
        {
            id: 6,
            type: "NewDeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "United States",  "United Kingdom"],
            row: 2,
            col: 8,
            rows: 2, cols: 4,
            props: [],
        },


    ]
}
