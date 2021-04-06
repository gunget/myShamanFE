import React from "react";
import Home from "./Home.jsx";
import Store from "../contexts/Contexts.jsx";
import { Redirect } from "react-router-dom";

const RestrictedRoute = ({ location, history }) => {
  //Router가 Route간 props전달을 위해쓰는 history를 컴포넌트의 props로 받아옴

  const isAuthenticated =
    location.state !== undefined ? location.state.isAuthenticated : false;
  //로그인시 isAuthenticate를 주는데 이게 없다면 false

  // console.log("RestricedRoute에 넘어온 history:", history);

  if (isAuthenticated !== false) {
    return (
      <Store>
        <Home location={location} history={history} />
      </Store>
    ); //정상적인 로그인 일때
  } else {
    return <Redirect to={{ pathname: "/" }} />; //url로 직접접근 하려 들때
  }
};

export default RestrictedRoute;
