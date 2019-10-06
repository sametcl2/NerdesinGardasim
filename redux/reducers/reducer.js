import { combineReducers } from 'redux';

const initialStates= {
    locations: [],
    lastLocation: {},
}

const lastLocations = (state = initialStates.lastLocation, action) => {
    switch(action.type) {
        case 'CURRENT_LOCATION' : 
            return {
                lastLocation: action.location
            }
    }
}

const addlocation = (state = initialStates.locations, action) => {
    switch(action.type) {
        case 'ADD_LOCATION' : 
            return [...state, action.location]
    }
}

const reducers = combineReducers({
    lastLocations,
    addlocation
});

export default reducers;