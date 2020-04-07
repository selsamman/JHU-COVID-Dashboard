export default {

    addWidgetToMatrix: (row, col) => ({
        nextWidgetId: {
            set: state => state.nextWidgetId + 1
        },
        widgets: {
            append: (state) => ({
                id: state.nextWidgetId,
                type: "CasesPerPopulationOverTime",
                countries: ["Ireland", "United States"],
                row: row,
                col: col
            })
        },
    }),
    deleteWidgetFromMatrix: () => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            delete: true,
        }
     }),
    addVerifiedCountryToWidget: (country) => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            select: {
                countries: {
                    append: () => country
                }
            }
        }
    }),
    deleteCountryFromWidget: (country) => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            select: {
                countries: {
                    where: (state, item) => item === country,
                    delete: true
                }
            }
        }
    }),
    addPropToWidget: (prop) => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            select: {
                props: {
                    append: () => prop
                }
            }
        }
    }),
    deletePropFromWidget: (prop) => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            select: {
                props: {
                    where: (state, item) => item === prop,
                    delete: true
                }
            }
        }
    }),

    setWidgetData: (widgetData, specificId) => ({
        widgets: {
            where: (state, item, ix, {id}) => item.id === id,
            assign: () => widgetData
        }
    }),

    insertRow: (row) => ({
        widgets: {
            where: (state, item) => item.row >= row,
            assign: (state, item) => ({row: item.row + 1})
        }
    }),

    editWidget: (xid) => ({
        widgetBeingConfiguredId: {
            set: (state, item, {id}) => xid || id,
        }
    }),

    doneEditing: () => ({
        widgetBeingConfiguredId: {
            set: () => -1,
        }
    })
}
