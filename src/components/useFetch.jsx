import React, { useContext } from "react";
import { DispatchContext } from "../contexts/Contexts.jsx";
import axios from "axios";

const useFetch = () => {
  const dispatch = useContext(DispatchContext);

  const fetchDirectorInfo = () => {
    axios
      .get("http://localhost:8000/api/directorInfo/")
      .then((res) => {
        // console.log("Get list from DB:", res);
        dispatch({ type: "SET_DRT_INIT_DATA", payload: res.data });
      })
      .then(() => {
        // setLoading(false);
        dispatch({ type: "DRT_INIT_LOADING_TOGGLE", payload: false });
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };

  const fetchFicWriterInfo = () => {
    axios
      .get("http://localhost:8000/api/ficWriterInfo/")
      .then((res) => {
        console.log("Get list from DB:", res);
        dispatch({ type: "SET_FWRT_INIT_DATA", payload: res.data });
      })
      .then(() => {
        // setLoading(false);
        dispatch({ type: "FWRT_INIT_LOADING_TOGGLE", payload: false });
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };
  return { fetchDirectorInfo, fetchFicWriterInfo }; //key:value가 같은 객체를 destructive로 리턴
};

export default useFetch;
