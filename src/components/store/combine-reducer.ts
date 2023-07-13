import { IAppState } from ".";

export const combineReducer = (reducers: any) => (state: any, action: any) =>
  //console.log('state', state, action)
  Object.keys(reducers).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: reducers[prop]({ ...acc, [prop]: acc[prop] }, action),
    }),
    state
  );
