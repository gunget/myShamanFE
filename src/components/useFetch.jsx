import { useContext, useEffect } from "react";
import { DispatchContext } from "../contexts/Contexts.jsx";
import axios from "axios";

const useFetch = () => {
  const dispatch = useContext(DispatchContext);

  const jwt = JSON.parse(localStorage.getItem("jwt"));

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
    dispatch({ type: "SET_JWT", payload: jwt }); //받아온 토큰을 state에 저장. 딱 한번만 하려고 useEffect사용.
  }, []);

  return {
    fetchDirectorInfo,
    fetchFicWriterInfo,
    fetchNonFicWriterInfo,
    fetchOthersInfo,
    jwt,
  }; //key:value가 같은 객체를 destructive로 리턴
};

export default useFetch;
