import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import RestrictedRoute from "./components/RestrictedRoute";
import NotFound from "./components/NotFound";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <>
      {/* <CssBaseline /> */}
      <Router>
        {/* Router안의 route들은 연결 컴포넌트네 props로 history, location, match를 준다
          match는 path와 url이 매칭된 정보를, location은 현재페이지의 정보를
          history는 브라우저의 history와 비슷, stack에 현재까지 이동 url이 담겨, 임의로 이동할 수 있게 해준다. */}
        {/*보통 history에 정보를 넣어 보내서, location에서 활용하는 듯. */}
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Home" component={RestrictedRoute} />
          {/* Route만이 location, history props를 쓸 수 있다. 하위에서 history를 쓰기위해
            HOC를 이용하여 history를 내려준 것 */}
          {/* 사용자가 url을 직접입력해 landing Page로 접근하는 것 막기 위해 제한된 Route설정
            HOC형식을 빌어 RestrictedRoute가 인증여부를 검토 */}
          {/* <Route path="/main" component={FbStore} /> */}
          <Route component={NotFound} />
          {/* 실제 배포시에는 이렇게 해서 API나 관리자로 접근하는 걸 막을 수도 있겠다. */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
