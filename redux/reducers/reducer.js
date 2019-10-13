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
    }
}

const lastLocations = (state = initialStates.lastLocation, action) => {
    switch(action.type) {
        case 'CURRENT_LOCATION' : 
            return {
                lastLocation: action.location
            }
    }
}

const addUser = (state, action) => {
    switch(action.type) {
        case 'ADD_USER' :
            return {
                newUser = {...action.users}
            }
    }
}

const Reducers = combineReducers({
    lastLocations,
    addlocation,
    addUser
});

export default Reducers;