import { SET_USERNAME, SET_USER_LOCATION, ADD_FRIEND, RESET_FRIENDS } from './types'

export function setUserName(name) {
  return { type: SET_USERNAME, name };
}

export function setUserLocation(location) {
    return { type: SET_USER_LOCATION, location };
}

export function addFriend(friend) {
    return { type: ADD_FRIEND, friend };
}

export function resetFriends(friends) {
    return { type: RESET_FRIENDS, friends };
}
