export const currentLocation = location => {
    return {
        type: 'CURRENT_LOCATION',
        location
    }
}

export const addLocation = location => {
    return {
        type: 'ADD_LOCATION',
        location
    }
}