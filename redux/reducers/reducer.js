import { combineReducers } from 'redux';

const initialStates= {
    locations: [],
    lastLocation: {},
    newUser: {
        email: '',
        password: '',
        fullName: ''
    },
}

const addlocation = (state = initialStates.locations, action) => {
    switch(action.type) {
        case 'ADD_LOCATION' : 
            return [...state, action.location]
        default:
            return state
    }
}

const lastLocations = (state = initialStates.lastLocation, action) => {
    switch(action.type) {
        case 'CURRENT_LOCATION' : 
            return {
                state: action.location
            }
        default:
            return state
    }
}

const addUser = (state = initialStates.newUser, action) => {
    switch(action.type) {
        case 'ADD_USER' :
            return {
                state: {...action}
            }
        default:
            return state
    }
}

const Reducers = combineReducers({
    lastLocations,
    addlocation,
    addUser
});

export default Reducers;