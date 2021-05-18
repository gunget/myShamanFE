import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "../contexts/Contexts.jsx";
import axios from "axios";

const useFetch = () => {
  const dispatch = useContext(DispatchContext);
  const states = useContext(StateContext);

  // localstrage에 있는 jwt를 state에 넣어주고 지우기
  // if (localStorage.getItem("jwt")) {
  //   const token = JSON.parse(localStorage.getItem("jwt"));
  //   dispatch({ type: "SET_JWT", payload: token });
  // }

  const jwt = localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt"))
    : states.jwt;

  const config = {
    headers: {
      Authorization: `jwt ${jwt.token}`,
    },
  };

  const fetchDirectorInfo = () => {
    axios
      .get("http://localhost:8000/api/directorInfo/", config)
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
      .get("http://localhost:8000/api/ficWriterInfo/", config)
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

  const fetchNonFicWriterInfo = () => {
    axios
      .get("http://localhost:8000/api/nonFicWriterInfo/", config)
      .then((res) => {
        console.log("Get list from nonFic DB:", res);
        dispatch({ type: "SET_NFWRT_INIT_DATA", payload: res.data });
      })
      .then(() => {
        // setLoading(false);
        dispatch({ type: "NFWRT_INIT_LOADING_TOGGLE", payload: false });
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };
  const fetchOthersInfo = () => {
    axios
      .get("http://localhost:8000/api/othersInfo/", config)
      .then((res) => {
        console.log("Get list from nonFic DB:", res);
        dispatch({ type: "SET_OTHERS_INIT_DATA", payload: res.data });
      })
      .then(() => {
        // setLoading(false);
        dispatch({ type: "OTHERS_INIT_LOADING_TOGGLE", payload: false });
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };

  useEffect(() => {
    // localstrage에 있는 jwt를 state에 넣어주고 지우기. 브라우저가 refresh되면 reducer의 jwt는 사라짐
    if (localStorage.getItem("jwt")) {
      const token = JSON.parse(localStorage.getItem("jwt"));
      dispatch({ type: "SET_JWT", payload: token });
      localStorage.removeItem("jwt");
    }
  }, []);

  return {
    fetchDirectorInfo,
    fetchFicWriterInfo,
    fetchNonFicWriterInfo,
    fetchOthersInfo,
  }; //key:value가 같은 객체를 destructive로 리턴
};

export default useFetch;
