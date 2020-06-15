import axios from 'axios';
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT, EVENTS_LOADING } from './types';
import { returnError } from './errorActions';

export const getEvents = () => (dispatch) => {
    dispatch(setEventsLoading());
    axios
        .get('api/events')
        .then((res) =>
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        )
        .catch((err) => dispatch(returnError(err.response.data, err.response.status)));

};
export const setEventsLoading = () => {
    return {
        type: EVENTS_LOADING
    };
};