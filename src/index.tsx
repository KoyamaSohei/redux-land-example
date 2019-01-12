import React, { Component, FunctionComponent } from "react";
import { render } from "react-dom";
import { Dispatch } from "redux";
import { connect, Provider } from "react-redux";
import store from "./module";
import { State, Actions, ActionType, LandActionType } from "./types";

interface MainPropsState {
  counter?: number;
}

interface MainPropsDispatch {
  inc3?: () => void;
  ainc?: () => void;
}

interface MainProps extends MainPropsState, MainPropsDispatch {}

const main: FunctionComponent<MainProps> = ({ counter, inc3, ainc }) => (
  <div>
    <p>{counter}</p>
    <button onClick={inc3}>+3</button>
    <button onClick={ainc}>+1 after 3000ms</button>
  </div>
);

const mapStateToProps = (state: State) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  inc3: () => {
    dispatch({ type: ActionType.INC, payload: 3 });
  },
  ainc: () => {
    dispatch({ type: LandActionType.AINC, payload: { num: 1, delay: 3000 } });
  }
});

const Main = connect<MainPropsState, MainPropsDispatch, MainProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(main);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
render(<App />, document.getElementById("app"));
