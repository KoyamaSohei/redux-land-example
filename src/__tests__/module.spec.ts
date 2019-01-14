import { createStore, applyMiddleware } from "redux";
import createLandMiddleware, { Land, Lands } from "redux-land";
import { State, ActionType, Actions, LandActionType, AINC } from "../types";
import { reducer, lands, AInc } from "../module";
describe("module test", () => {
  it("unit test",async (end) => {
    const itr = AInc({
      state: {
        counter: 0
      },
      action: { type: LandActionType.AINC, payload: { num: 5, delay: 1000 } }
    });
    const {value} = await itr.next();
    expect(value).toEqual({type: ActionType.INC,payload: 5});
    const {done} = await itr.next();
    expect(done).toEqual(true);
    end();
  });
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
