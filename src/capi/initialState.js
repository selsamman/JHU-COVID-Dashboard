export default {
    widgetBeingConfiguredId: -1,
    nextWidgetId: 5,
    widgets: [
        {
            id: 1,
            type: "CasesPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 0,
            col: 0
        },
        {
            id: 2,
            type: "NewCasesPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 0,
            col: 1
        },
        {
            id: 3,
            type: "DeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 1,
            col: 0
        },
        {
            id: 4,
            type: "NewDeathsPerPopulationOverTime",
            countries: ["Ireland", "Germany", "South Korea", "United States",  "United Kingdom"],
            row: 1,
            col: 1
        },

    ]
}
