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
            type: "CasesPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 0, col: 0,
            rows: 2, cols: 6,
            props: [],
        },
        {
            id: 2,
            type: "DataForCountry",
            countries: ["Ireland"],
            row: 0,
            col: 6,
            rows: 1, cols: 6,
            props: ["deaths", "cases", "deathsPerM", "casesPerM"],
        },
        {
            id: 3,
            type: "DataForCountry",
            countries: ["United States"],
            row: 3,
            col: 6,
            rows: 1, cols: 6,
            props: ["deaths", "cases", "deathsPerM", "casesPerM"],
        },
        {
            id:4,
            type: "DeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 2,
            col: 0,
            rows: 3, cols: 6,
            props: [],
        },
        {
            id: 5,
            type: "NewDeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 1,
            col: 6,
            rows: 2, cols: 6,
            props: [],
        },
        {
            id: 6,
            type: "Blank",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 4,
            col: 6,
            rows: 1, cols: 6,
            props: [],
        },

    ]
}
