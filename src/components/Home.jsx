import React, { useEffect, useContext } from "react";
import axios from "axios";
import DirectorsList from "./DirectorsList";
import SearchDirector from "./SearchDirector";
import { DispatchContext } from "../contexts/Contexts.jsx";

const Home = () => {
  const dispatch = useContext(DispatchContext);

  const fetchDirectorInfo = () => {
    axios
      .get("http://localhost:8000/api/directorInfo/")
      .then((res) => {
        console.log("Get list from DB:", res);
        dispatch({ type: "SET_INIT_DATA", payload: res.data });
      })
      .then(() => {
        // setLoading(false);
        dispatch({ type: "INIT_LOADING_TOGGLE", payload: false });
      })
      .catch((error) => {
        console.log("DB에러:", error);
      });
  };

  // const handleChange = (e) => {
  //   setSearchWord(e.target.value);
  // };

  useEffect(() => {
    fetchDirectorInfo();
    console.log("Home component useEffect실행");
  }, []);

  return (
    <div className="container">
      <SearchDirector fetchDirectorInfo={fetchDirectorInfo} />
      <DirectorsList fetchDirectorInfo={fetchDirectorInfo} />
    </div>
  );
};

export default Home;

// 박훈정 102768
