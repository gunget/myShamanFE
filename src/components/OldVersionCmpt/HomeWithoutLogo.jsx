import React, { useEffect, useState } from "react";
import Carousel from "re-carousel";
import ScrollUpButton from "react-scroll-up-button";
import axios from "axios";

import MenuList from "./MenuList";
import SectionDirector from "./SectionDirector";
import SectionFicWtr from "./SectionFicWtr";
import SectionNonFicWtr from "./SectionNonFicWtr";
import SectionOthers from "./SectionOthers";
import PageSearch from "./PageSearch";
import useFetch from "./useFetch";
import ImportScript from "./ImportScript";

import "../assets/css/main.css";
import "../assets/css/fontawesome-all.min.css";

// material ui import
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// template img
import globalImgs from "../images/globalImgs";

// material ui tap기능 활용 위한 함수들
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "none",
    display: "none",
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tap: {},
  taps: {
    backgroundColor: "transparent",
  },
  views: {
    marginTop: "30px",
  },
}));

// 실제 Home 컴포넌트
const Home = ({ location, history }) => {
  const [username, setUserName] = useState("anonymous");

  //초기 데이터 DB에서 불러오기
  const {
    fetchDirectorInfo,
    fetchFicWriterInfo,
    fetchNonFicWriterInfo,
    fetchOthersInfo,
    jwt,
  } = useFetch();

  //각 카테고리의 검색 및 추가 파트로 이동하기
  const handleAdd = (id) => {
    const titleElem = document.getElementById(id);
    titleElem.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  // material ui tap기능 활용 부분
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue); //tap전환용
  };

  const logout = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `jwt ${jwt.token}`,
      },
    };
    axios
      .post("http://localhost:8000/rest-auth/logout/", config)
      .then(localStorage.removeItem("jwt"))
      .then(history.push("/"));
  };

  //Tap 전환
  const chageTaps = (e) => {
    e.preventDefault();
    const elemID = Number(e.target.dataset.id);
    console.log("tap 전환 번호:", elemID, e);
    handleChange(null, elemID); //탭의 아이디를 직접 변경
    return e.target.dataset.name;
  };

  //async, await을 이용해 동기적으로 탭을 바꾸고 이동하기 구현
  function ScrollToElem(e) {
    async function Scroll(e) {
      const promise = new Promise((resolve, reject) => {
        const response = chageTaps(e);
        if (response) {
          resolve(response);
        }
        reject(new Error("Request is failed"));
      });
      const res = await promise; //앞단계가 끝날때까지 여기서 기다림
      const titleElem = document.getElementById(res);
      titleElem.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    Scroll(e);
  }

  useEffect(() => {
    // 리액트에서 외부 스크립트 불러오는 방법.
    // 아래 두파일을 최초 index.html이 뜰때 같이 로딩되기는 하지만 적용될 엘러먼트가 없어 무용지물이 됨
    // Home 컴포넌트가 띄워지며 엘러먼트는 뜨지만 js가 적용안되는 걸 해결하려, 무효화된 js 다시 로딩
    // 대부분 되지만 sideBar의 scrollLocked기능은 여전히 안됨
    ImportScript("../assets/js/breakpoints.min.js");
    ImportScript("../assets/js/browser.min.js");
    ImportScript("../assets/js/main.js");
    ImportScript("../assets/js/util.js");

    setUserName(location.state.username); //jwt를 활용할때 관련 부분 수정할 것. 받아오는 username으로.
    fetchDirectorInfo();
    fetchFicWriterInfo();
    fetchNonFicWriterInfo();
    fetchOthersInfo();
    console.log("Home component useEffect실행");
  }, []);

  return (
    <div className="container">
      {/* <!-- Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Main --> */}
        <div id="main">
          <div className="inner">
            {/* <!-- Header --> */}
            <header id="header">
              <a href="/Home" className="logo">
                <strong>MyShamans</strong> : Let's memorize !
              </a>
              <ul className="icons">
                <li>
                  <a href="#" onClick={logout}>
                    <i class="fas fa-drafting-compass"></i>
                    <span className="label"> {username} : logout </span>
                  </a>
                </li>
              </ul>
            </header>
            {/* <!-- Banner --> */}
            <section id="banner">
              <div className="content">
                <header>
                  <h1>
                    Bone To Be
                    <br />
                    Storyteller&nbsp;&nbsp;<i class="fas fa-feather-alt"></i>
                  </h1>
                  <p className="korean2 header">
                    이야기꾼은 만들어지지 않는다. <br /> 다만 타고날 뿐
                  </p>
                </header>
                <p className="korean title">
                  쏟아지는 콘텐츠는 우리에게 '선택'의 짐을 안겼다.
                  <br /> 무엇을 보고 무엇을 들을 것인가.
                  <br /> 콘텐츠가 많아질수록 '타고난 이야기꾼'은 사라진다.{" "}
                  <br />
                  <br />
                  졸작의 숲에서 느꼈던 분노를 몰아내고자,
                  <br /> 여기 그들의 발자취를 기록한다.
                  <br /> 부디 그들을 따라 걸으며 더이상의 답답함은 없기를.
                  <br /> 또 한번의 전율이 이 걸음에 함께 하기를.
                </p>
              </div>
              <span className="image object">
                <Carousel loop="true" auto interval="5000" duration="500">
                  <img src={globalImgs.frontImage1} alt="대문그림"></img>
                  <img src={globalImgs.frontImage2} alt="대문그림"></img>
                  <img src={globalImgs.frontImage3} alt="대문그림"></img>
                </Carousel>
              </span>
            </section>
            {/* <!-- Section Intro--> */}
            <section>
              <header className="major">
                <h2>Main Contents</h2>
              </header>
              <div className="features">
                <article>
                  <span className="icon fa-gem"></span>
                  <div className="content">
                    <h3
                      onClick={ScrollToElem}
                      // onClick={chageTapsNscroll}
                      data-id="0"
                      data-name="DirectorList"
                    >
                      Movie Directors &nbsp;&nbsp;▶
                    </h3>
                    <p>
                      언제나 손꼽아 기다리게 되는 감독들. 그들의 필모그래피를
                      네이버영화를 기반으로 작성. 한글이름을 사용하며
                      오름차순으로 정렬
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-paper-plane"></span>
                  <div className="content">
                    <h3
                      onClick={ScrollToElem}
                      // onClick={chageTapsNscroll}
                      data-id="1"
                      data-name="FictionWriterList"
                    >
                      Fiction Wirters &nbsp;&nbsp;▶
                    </h3>
                    <p>
                      드라마, 소설 등 타고난 스토리 작가들을 갈무리. 네이버
                      API를 기반으로 작성되어 한글 오름차순으로 정렬
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-rocket"></span>
                  <div className="content">
                    <h3
                      // onClick={chageTapsNscroll}
                      onClick={ScrollToElem}
                      data-id="2"
                      data-name="NonFictionWriterList"
                    >
                      Nonfiction Wirters &nbsp;&nbsp;▶
                    </h3>
                    <p>
                      차기작을 늘 기다리게 만드는 비소설 작가들을 갈무리. 네이버
                      API를 기반으로 작성되어 한글 오름차순으로 정렬
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-signal"></span>
                  <div className="content">
                    <h3 // onClick={chageTapsNscroll}
                      onClick={ScrollToElem}
                      data-id="3"
                      data-name="TheOthersList"
                    >
                      The others &nbsp;&nbsp;▶
                    </h3>
                    <p>
                      기타 분류하기 애매하지만 인상적인 인물들을 갈무리.
                      간략하게 이름 정도만 제공하는 용도
                    </p>
                  </div>
                </article>
              </div>
            </section>
            {/* <!-- Section Director --> */}
            {/* material ui tap */}
            <div className={classes.root}>
              <AppBar position="static" className={classes.appBar}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Movie Directors" {...a11yProps(0)} />
                  <Tab label="Fiction Writers" {...a11yProps(1)} />
                  <Tab label="NonFiction Writers" {...a11yProps(2)} />
                  <Tab label="The Others" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              {/* <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={classes.views}
              > */}
              <TabPanel value={value} index={0} dir={theme.direction}>
                <SectionDirector
                  fetchDirectorInfo={fetchDirectorInfo}
                  handleAdd={handleAdd}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <SectionFicWtr
                  fetchFicWriterInfo={fetchFicWriterInfo}
                  handleAdd={handleAdd}
                />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <SectionNonFicWtr
                  fetchNonFicWriterInfo={fetchNonFicWriterInfo}
                  handleAdd={handleAdd}
                />
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <SectionOthers
                  fetchOthersInfo={fetchOthersInfo}
                  handleAdd={handleAdd}
                />
              </TabPanel>
              {/* </SwipeableViews> */}
            </div>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
        <div id="sidebar">
          <div className="inner" id="sidebarInner">
            {/* <!-- Search bar --> */}
            <PageSearch handleChange={handleChange} />
            {/* <!-- Menu --> */}
            <nav id="menu">
              <header className="major">
                <h2>Menu</h2>
              </header>
              <ul>
                <li>
                  <a
                    onClick={ScrollToElem}
                    data-id="0"
                    data-name="DirectorList"
                  >
                    Movie Directors&nbsp;&nbsp;
                    <i
                      class="fas fa-gem"
                      data-id="0"
                      data-name="DirectorList"
                    ></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="0">
                    Movie Directors Lists
                  </span>
                  <ul>
                    <li>
                      <a onClick={() => handleAdd("searchNadd")}>➕ ADD NEW</a>
                    </li>
                    <MenuList handleAdd={handleAdd} type="directors" />
                  </ul>
                </li>
                <li>
                  <a
                    onClick={ScrollToElem}
                    data-id="1"
                    data-name="FictionWriterList"
                  >
                    Fiction Writers&nbsp;&nbsp;
                    <i
                      class="fas fa-paper-plane"
                      data-id="1"
                      data-name="FictionWriterList"
                    ></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="1">
                    Fiction Writers Lists
                  </span>
                  <ul>
                    <li>
                      <a onClick={() => handleAdd("searchNadd")}>➕ ADD NEW</a>
                    </li>
                    <MenuList handleAdd={handleAdd} type="fictionWriters" />
                  </ul>
                </li>
                <li>
                  <a
                    onClick={ScrollToElem}
                    data-id="2"
                    data-name="NonFictionWriterList"
                  >
                    Nonfiction Writers&nbsp;&nbsp;
                    <i
                      class="fas fa-rocket"
                      data-id="2"
                      data-name="NonFictionWriterList"
                    ></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="2">
                    Nonfiction Writers Lists
                  </span>
                  <ul>
                    <li>
                      <a onClick={() => handleAdd("searchNadd")}>➕ ADD NEW</a>
                    </li>
                    <MenuList handleAdd={handleAdd} type="nonFictionWriters" />
                  </ul>
                </li>
                <li>
                  <a
                    onClick={ScrollToElem}
                    data-id="3"
                    data-name="TheOthersList"
                  >
                    The Others&nbsp;&nbsp;
                    <i
                      class="fas fa-signal"
                      data-id="3"
                      data-name="TheOthersList"
                    ></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="3">
                    The Others Lists
                  </span>
                  <ul>
                    <li>
                      <a onClick={() => handleAdd("searchNadd")}>➕ ADD NEW</a>
                    </li>
                    <MenuList handleAdd={handleAdd} type="others" />
                  </ul>
                </li>
              </ul>
            </nav>
            {/* <!-- Section Contact--> */}
            <section>
              <header className="major">
                <h2>Get in touch</h2>
              </header>
              <p>
                &nbsp;불혹을 진즉 넘긴 코린이. 독학이라 아는 것도 없지만 행여
                궁금하신게 있다면 메모 남겨주세요. 답변을 드릴 수 있을진
                모르겠습니다.
              </p>
              <ul className="contact">
                <li className="icon solid fa-envelope">
                  <p>adminTravis@google.com</p>
                </li>
                <li className="icon solid fa-phone">(010) 0000-0000</li>
                <li className="icon solid fa-home">
                  1234 개발자의 길 #8254
                  <br />
                  경기도, 빛이 밝게 빛나는 도시 <br /> TN 00000-0000
                </li>
              </ul>
            </section>

            {/* <!-- Section Change Content --> */}
            <section>
              <header className="major">
                <h2>Change CATs</h2>
              </header>
              <div className="container">
                <div class="list">
                  <div class="num">
                    <h3
                      onClick={ScrollToElem}
                      // onClick={chageTapsNscroll}
                      data-id="0"
                      data-name="DirectorList"
                    >
                      Go Movie Directors &nbsp;&nbsp;
                      <i
                        class="fas fa-gem"
                        data-id="0"
                        data-name="DirectorList"
                      ></i>
                    </h3>
                  </div>
                  <div class="num">
                    <h3
                      onClick={ScrollToElem}
                      data-id="1"
                      data-name="FictionWriterList"
                    >
                      Go Fiction Writers &nbsp;&nbsp;
                      <i
                        class="fas fa-paper-plane"
                        data-id="1"
                        data-name="FictionWriterList"
                      ></i>
                    </h3>
                  </div>
                  <div class="num">
                    <h3
                      onClick={ScrollToElem}
                      data-id="2"
                      data-name="NonFictionWriterList"
                    >
                      Go NonFiction Writers &nbsp;&nbsp;
                      <i
                        class="fas fa-rocket"
                        data-id="2"
                        data-name="NonFictionWriterList"
                      ></i>
                    </h3>
                  </div>
                  <div class="num">
                    <h3
                      onClick={ScrollToElem}
                      data-id="3"
                      data-name="TheOthersList"
                    >
                      Go The Others &nbsp;&nbsp;
                      <i
                        class="fas fa-signal"
                        data-id="3"
                        data-name="TheOthersList"
                      ></i>
                    </h3>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Footer --> */}
            <footer id="footer">
              <p className="copyright">
                &copy; Untitled. All rights reserved. Demo Images:{" "}
                <a href="https://unsplash.com">Unsplash</a>. Design:{" "}
                <a href="https://html5up.net">HTML5 UP</a>.
              </p>
            </footer>
            <ScrollUpButton
              StopPosition={0}
              // 버튼을 누르면 멈출 y축 높이값
              ShowAtPosition={500}
              EasingType="easeOutCubic"
              AnimationDuration={400}
              // ContainerClassName="ScrollUpButton__Container"
              // TransitionClassName="ScrollUpButton__Toggled"
              style={{
                backgroundColor: "#f56a6a",
                borderRadius: "4px",
                height: "30px",
                width: "30px",
              }}
              ToggledStyle={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
