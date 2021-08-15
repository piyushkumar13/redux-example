import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const reduxThunk = thunk.default;

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};

const fetchUsersError = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
};

const fetchUsers = () => {

    return function (dispatch) {

        dispatch(fetchUsersRequest());

        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                dispatch(fetchUsersSuccess(response.data.map(user => user.id)));
            })
            .catch(error => {
                dispatch(fetchUsersError(error.message))
            });

    }
};

const initialState = {
    loading: false,
    users: [],
    error: ""
};

const reducer = (prevState = initialState, action) => {

    switch (action.type) {

        case FETCH_USERS_REQUEST:
            return {
                ...prevState,
                loading: true
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                users: action.payload
            };

        case FETCH_USERS_FAILURE:
            return {
                ...prevState,
                loading: false,
                error: action.payload
            };
    }
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

store.subscribe(() => console.log("Updated state is ::: ", store.getState()));
store.dispatch(fetchUsers());


