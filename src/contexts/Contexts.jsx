import { createContext, useReducer } from "react";

export const StateContext = createContext();
export const DispatchContext = createContext();

function Reducer(states, { type, payload }) {
  switch (type) {
    case "SET_DRT_INIT_DATA":
      return {
        ...states,
        directors: payload,
      };
    case "DRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          directorInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_FWRT_INIT_DATA":
      return {
        ...states,
        fictionWriters: payload,
      };
    case "FWRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          ficWriterInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_NFWRT_INIT_DATA":
      return {
        ...states,
        nonFictionWriters: payload,
      };
    case "NFWRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          nonFicWriterInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_OTHERS_INIT_DATA":
      return {
        ...states,
        others: payload,
      };
    case "OTHERS_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          othersInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
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
    fictionWriters: [],
    nonFictionWriters: [],
    others: [],
    loadings: {
      directorInitLoading: true,
      ficWriterInitLoading: true,
      nonFicWriterInitLoading: true,
      othersInitLoading: true,
      generalLoading: true,
    },
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={states}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Store;
