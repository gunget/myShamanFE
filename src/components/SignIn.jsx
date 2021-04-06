import React, { useRef } from "react";
import axios from "axios";
import CSRFToken from "./CSRFToken";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
  const alertMessage = useRef();

  const testSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: nameRef.current.value,
      // email: "travis@travis.com",
      password: pwRef.current.value,
    };

    function getSetJwt(nameFromServer) {
      axios
        .post("http://127.0.0.1:8000/api-jwt-auth/login", data)
        .then((response) => {
          return response.data; //리턴값이 다음 then으로 넘겨짐
        })
        .then((data) => {
          console.log("새jwt:", data);
          localStorage.setItem("jwt", JSON.stringify(data));
          return data;
        })
        .then((data) => {
          history.push({
            pathname: "/main",
            state: { isAuthenticated: true, username: nameFromServer },
          });
        });
      //실제 data를 쓰진 않지만 이전 작업이 끝나고 실행되도록
      //data를 더미 용도로 사용함
    }

    const checkUser = async () => {
      const userRsp = await axios
        .post("http://localhost:8000/rest-auth/login/", data)
        .then((data) => {
          history.push({
            pathname: "/Home",
            state: { isAuthenticated: true },
          });
          return data;
        })
        .then((data) => {
          window.location.reload();
          // js가 적용된 템플릿을 리액트로 가져다 쓸 때 생기는 문제점!!!!
          // 최초 signIn page단계에서 static설정들을 위한 js들이 모두 실행 및 종료되어, 실제로
          // 로그인 후 Home comp가 로드되고 나면, 저들에 의한 동작들이 하나도 안 먹음
          // 가장 간단한 해결책은 일단 home으로 push된 후 페이지를 reload하는 법
          // 단점: 이렇게 하면 token을 state로 사용하는 방식은 사용 불가능
        })
        .catch((error) => error.response); //return글자를 안써야 error값이 리턴된다!!!!!
      //또 axios는 error라고만 하면 response데이터를 볼 수 없다. error.response라 해야 한다.
      //하나 더, 동기작업(시퀸스작업)을 하려면 반드시 'axios의 return값을 받는 변수명'으로 다음 작업을
      //해야 한다.
      if (userRsp.status === 200) {
        // getSetJwt(userRsp.data.user.username); //서버에서 로그인 성공후 받은 자료 활용
      } else {
        console.log("error message:", userRsp);
        alertMessage.current.innerHTML =
          "ID 또는 비밀번호를 잘 못 입력하셨습니다.";
        alertMessage.current.className = classes.alert;
      }
    };

    //이미 jwt를 받은게 있다면 검증
    const jwtFromLS = JSON.parse(localStorage.getItem("jwt"));
    if (jwtFromLS) {
      axios
        .post("http://localhost:8000/api-jwt-auth/refresh/", jwtFromLS)
        .then((response) => {
          localStorage.setItem("jwt", JSON.stringify(response.data));
        })
        .then(history.push("/main/"))
        .catch((error) => {
          console.log(error);
        });
    } else {
      checkUser();
    }
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
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
            onClick={testSubmit}
          >
            로그인
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/SignUp" variant="body2">
                <div ref={alertMessage}>"계정이 없습니까? 회원가입하세요."</div>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
