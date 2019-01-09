import { createStore, applyMiddleware } from "redux";
import createLandMiddleware, { Land } from "redux-land";
import { State, ActionType, Actions, LandType, INC, AINC } from "./types";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const AInc: Land<State, AINC, INC> = async function*({ state, action }) {
  await sleep(action.payload.delay);
  yield {
    type: ActionType.INC,
    payload: action.payload.num
  };
};

const middleware = createLandMiddleware({
  [LandType.AINC]: AInc
});

const reducer = (state: State = { counter: 0 }, action: Actions) => {
  switch (action.type) {
    case ActionType.INC:
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(middleware));

export default store;
