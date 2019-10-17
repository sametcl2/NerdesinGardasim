const initialStates= {
    lastLocation: null,
    locations: [],
    user: {}
}

const reducer = (state = initialStates, action) => {
    switch (action.type) {
        case "CURRENT_LOCATION": 
            return {
                ...state,
                lastLocation: action.location
            }
        case "ADD_LOCATION": 
            return {
                ...state,
                locations: [...locations, action.location]                
            }
        case "ADD_USER": 
            return {
                ...state,
                user: {...action.user}
            }
        default:
            return state;
    }
}

export default reducer;