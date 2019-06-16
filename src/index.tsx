import React, { FC } from "react";
import { render } from "react-dom";
import { Dispatch } from "redux";
import { Provider, useSelector,useDispatch } from "react-redux";
import store from "./module";
import { State, Actions, ActionType, LandActionType } from "./types";

const Main: FC = () => {
  const counter = useSelector((state: State) => state.counter);
  const dispatch = useDispatch<Dispatch<Actions>>();
  const inc3 = () => dispatch({ type: ActionType.INC, payload: 3 });
  const ainc = () => dispatch({ type: LandActionType.AINC, payload: { num: 1, delay: 3000 } });
  return (
    <div>
      <p>{counter}</p>
      <button onClick={inc3}>+3</button>
      <button onClick={ainc}>+1 after 3000ms</button>
    </div>
  );
}

const App: FC = () =>  (
  <Provider store={store}>
    <Main />
  </Provider>
);

render(<App />, document.getElementById("app"));
