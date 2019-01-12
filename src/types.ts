import { Action } from "redux";

export type State = {
  counter: number;
};

export enum ActionType {
  INC = "INC"
}

export type INC = Action<ActionType.INC> & {
  payload: number;
};

export enum LandActionType {
  AINC = "AINC"
}

export type AINC = Action<LandActionType.AINC> & {
  payload: {
    num: number;
    delay: number;
  };
};

export type Actions = INC | AINC;
