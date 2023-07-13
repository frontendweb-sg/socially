import { IAppState } from ".";

export const combineReducer = (reducers: any) => (state: any, action: any) => {
  console.log("state", state, action);
  const obj = Object.keys(reducers).reduce(
    (acc, prop) => ({ ...reducers[prop]({ [prop]: acc[prop] }, action) }),
    state
  );

  console.log("obj", obj);
  return obj;
};
