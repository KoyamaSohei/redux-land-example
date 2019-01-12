import { createStore, applyMiddleware } from "redux";
import createLandMiddleware, { Land, Lands } from "redux-land";
import { State, ActionType, Actions, LandActionType, AINC } from "../types";
import { reducer, lands } from "../module";
describe("module test", () => {
  it("async increment", done => {
    const middleware = createLandMiddleware(lands);
    const store = createStore(reducer, applyMiddleware(middleware));
    expect(store.getState()).toEqual({ counter: 0 });
    store.subscribe(() => {
      expect(store.getState()).toEqual({ counter: 5 });
    });
    store.dispatch({
      type: LandActionType.AINC,
      payload: {
        num: 5,
        delay: 1000
      }
    });
    setTimeout(() => {
      expect(store.getState()).toEqual({ counter: 0 });
    }, 500);
    setTimeout(() => {
      expect(store.getState()).toEqual({ counter: 5 });
      done();
    }, 1500);
  });
});
