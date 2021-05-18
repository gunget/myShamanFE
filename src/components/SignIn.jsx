import React, { useRef } from "react";
import axios from "axios";
import CSRFToken from "./CSRFToken";
import globalImgs from "../images/globalImgs";

import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// 이게 있으면 mui의 body css가 우선적용 됨. 다른 css에서 body 항목을 쓴다면 deprecate됨.
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Time to share all
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
  alert: {
    color: "red",
    textDecoration: "underline",
  },
}));

export default function SignIn({ history }) {
  const classes = useStyles();
  const nameRef = useRef();
  const pwRef = useRef();
  const bgRef = useRef();
  const alertMessage = useRef();

  const changBlur = (e) => {
    const input = e.target.value;
    const length = input.length;
    const blurValue = 32 - length * 4;
    bgRef.current.style.filter = `blur(${blurValue}px)`;
  };

  const submit = (e) => {
    e.preventDefault();
    const data = {
      username: nameRef.current.value,
      password: pwRef.current.value,
    };

    function getSetJwt(nameFromServer) {
      axios
        .post("http://127.0.0.1:8000/api-jwt-auth/", data)
        .then((response) => {
          return response.data; //리턴값이 다음 then으로 넘겨짐
        })
        .then((data) => {
          // console.log("새jwt:", data);
          localStorage.setItem("jwt", JSON.stringify(data));
          return data;
        })
        .then((data) => {
          history.push({
            pathname: "/Home",
            state: { isAuthenticated: true, username: nameFromServer },
          });
          return data;
        })
        //실제 data를 쓰진 않지만 이전 작업이 끝나고 실행되도록
        //data를 더미 용도로 사용함
        // .then((res) => {
        //   window.location.reload();
        //   // 리액트 로그인 템플릿을, 무료 html템플릿(js포함됨)으로 가져다 쓸때 생기는 문제점!!!!
        //   // 첫째, 무료 템플릿 body태그에 적용되는 css들이 리액트 템플릿의 것으로 오버라이딩 된다.
        //   // 둘째, 로그인 템플릿을 띄울때 무료 탬플릿용 js들이 로드되는데 엘러먼트들이 없으므로 무효화된다.
        //   // 그결과, 로그인 후 Home으로 들어가보면 body용 css들이 안먹고, js도 로드되지 않는다
        //   // 해결책은,
        //   // 첫째, window.location.reload();해서 페이지를 다시열기. token을 state로 사용하는 방식 활용불가
        //   // 둘째, 리액트 템플릿의 cssBaseline컴포넌트 제거. Home 컴포넌트가 열릴때 특정 js를 다시로드.
        // })
        .catch((error) => error.response); //return글자를 안써야 error값이 리턴된다!!!!!
      //또 axios는 error라고만 하면 response데이터를 볼 수 없다. error.response라 해야 한다.
      //하나 더, 동기작업(시퀸스작업)을 하려면 반드시 'axios의 return값을 받는 변수명'으로 다음 작업을
      //해야 한다.
    }

    const checkUser = async () => {
      const userRsp = await axios
        .post("http://localhost:8000/rest-auth/login/", data)
        .catch((error) => error.response); //return글자를 안써야 error값이 리턴된다!!!!!
      //또 axios는 error라고만 하면 response데이터를 볼 수 없다. error.response라 해야 한다.
      //하나 더, 동기작업(시퀸스작업)을 하려면 반드시 'axios의 return값을 받는 변수명'으로 다음 작업을
      //해야 한다.
      if (userRsp.status === 200) {
        getSetJwt(userRsp.data.user.username); //서버에서 로그인 성공후 받은 자료 활용
      } else {
        // console.log("error message:", userRsp);
        alertMessage.current.innerHTML =
          "ID 또는 비밀번호를 잘 못 입력하셨습니다.";
        alertMessage.current.className = classes.alert;
      }
    };

    //이미 jwt를 받은게 있다면 검증
    const jwtFromLS = JSON.parse(localStorage.getItem("jwt"));
    if (jwtFromLS) {
      localStorage.removeItem("jwt");
      checkUser();
    } else {
      checkUser();
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${globalImgs.signIn})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "absolute",
          height: "100vh",
          width: "100%",
          filter: "blur(32px)",
          zIndex: "-1",
        }}
        id="background"
        ref={bgRef}
      ></div>
      <div className="container">
        <Container className={classes.container} component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <div className={classes.paper}>
            <img
              src={globalImgs.logo_trp}
              style={{
                width: "65%",
                height: "65%",
                marginTop: "-5em",
                marginBottom: "-1em",
                color: "red",
              }}
              alt="login BG"
            ></img>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography> */}
            <form
              className={classes.form}
              noValidate
              // action="http://localhost:8000/rest-auth/login/"
              // method="post"
            >
              <CSRFToken />
              {/* 장고의 CSRF방지 기능 활용 컴포넌트 */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                inputRef={nameRef}
                autoFocus
              />
              {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="Email"
            label="Email"
            name="Email"
            autoComplete="Email"
          /> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                name="Password"
                label="Password"
                id="Password"
                inputRef={pwRef}
                autoComplete="current-password"
                onInput={changBlur}
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submit}
              >
                로그인
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    <div ref={alertMessage}>
                      "계정이 없습니까? 회원가입하세요."
                    </div>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </>
  );
}
