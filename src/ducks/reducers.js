import { combineReducers } from 'redux';

import {
    RESET_FRIENDS,
    SET_USERNAME,
    SET_USER_LOCATION,
    ADD_FRIEND,
    INIT_NAME,
    INIT_LOCATION, GOOGLE_MAPS_KEY
} from './types';



function name(state=INIT_NAME, action) {
    switch (action.type) {
        case SET_USERNAME:
            return action.name;
        default:
            return state;
    }
}

function location(state=INIT_LOCATION, action) {
    switch (action.type) {
        case SET_USER_LOCATION:
            return action.location;
        default:
            return state;
    }
}

function friends(state=[], action) {
    switch (action.type) {
        case RESET_FRIENDS:
            return state;
        case ADD_FRIEND:
            return [
                ...state,
                action.friend
            ];
        default:
            return state;
    }
}

function googleKey(state=GOOGLE_MAPS_KEY, action) {
    switch (action.type) {
        case 'SET_GOOGLE_KEY':
            return action.key;
        default:
            return state;
    }
}


export default combineReducers({
    name,
    location,
    friends,
    googleKey
});