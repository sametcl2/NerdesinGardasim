import * as actions from '../actions/action';

const initialStates= {
    newUser:{},
    userUUID: '',
    location: {}
}

const reducer = (state = initialStates, action) => {
    switch (action.type) {
        case actions.NEWUSER:
            return {
                ...state,
                newUser: {
                    name: action.name,
                    email: action.email,
                    password: action.password
                }
            }
        case actions.USERUUID: 
            return {
                ...state,
                userUUID: action.id
            }
        case actions.LOCATION: 
            return {
                ...state,
                location: action.location
            }
        default:
            return state;
    }
}

export default reducer;