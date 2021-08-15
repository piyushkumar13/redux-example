/**
 * Import statement is not directly supported in node.
 * Refere this : https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
 * Refere this : https://stackoverflow.com/a/54090097/5527839
 * for solutions to support import in node. */
import {createStore, combineReducers} from "redux";
// const createStore = redux.createStore; // You can use this as well.

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

const buyCake = () => {

    return {
        type: BUY_CAKE,
        info: "Redux example for cake"
    };
}

const buyIcecream = () => {
    return {
        type: BUY_ICECREAM,
        info: "Redux example for cake"
    }
}


const initialStateForCake = {
    numOfCakes: 10
}

const initialStateForIcecream = {
    numOfIcecream: 8
}

const cakeReducer = (prevState = initialStateForCake, action) => {

    switch (action.type) {

        case BUY_CAKE:
            return {
                ...prevState,
                numOfCakes: prevState.numOfCakes - 1
            };

        default:
            return prevState;
    }
}

const icecreamReducer = (prevState = initialStateForIcecream, action) => {

    switch (action.type) {

        case BUY_ICECREAM:
            return {
                ...prevState,
                numOfIcecream: prevState.numOfIcecream - 1
            }

        default:
            return prevState;
    }
}

const rootReducer = combineReducers({
    cakeState: cakeReducer,
    icecreamState: icecreamReducer
});

const store = createStore(rootReducer);
console.log("The initial state is ::: ", store.getState());


const unsubscribe = store.subscribe(() => console.log("Updated state is ::: ", store.getState()));
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe();