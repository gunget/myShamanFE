import { createContext, useReducer } from "react";

export const StateContext = createContext();
export const DispatchContext = createContext();

function Reducer(states, { type, payload }) {
  switch (type) {
    case "SET_INIT_DATA":
      return {
        ...states,
        directors: payload,
      };
    case "INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          initLoading: payload,
          // initLoading: !states.loadings.initLoading,
        },
      };
    // '객체 속 객체' 중 일부만 바꾸는 방법
    // const array = { a : 1, b : { key: 1, val: 2 }, c : false }
    // const array5 = {...array, b:{...array.b, val:8}

    default:
      throw new Error("UnHandled Action!");
  }
}

function Store({ children }) {
  const [states, dispatch] = useReducer(Reducer, {
    directors: [],
    writers: [],
    loadings: { initLoading: true, generalLoading: true },
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={states}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Store;
