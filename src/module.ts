import { createStore, applyMiddleware } from "redux";
import createLandMiddleware, { Land, Lands } from "redux-land";
import { State, ActionType, Actions, LandActionType, INC, AINC } from "./types";

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

export const lands : Lands<typeof LandActionType, State> = {
  [LandActionType.AINC]: AInc
}

const middleware = createLandMiddleware<typeof LandActionType>(lands);

export const reducer = (state: State = { counter: 0 }, action: Actions) => {
  switch (action.type) {
    case ActionType.INC:
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(middleware));

export default store;
