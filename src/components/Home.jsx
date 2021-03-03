import React, { useEffect, useContext } from "react";
import Carousel from "re-carousel";
import ScrollUpButton from "react-scroll-up-button";

import axios from "axios";
import MenuDirectorList from "./MenuDirectorList";
import SectionDirector from "./SectionDirector";
import PageSearch from "./PageSearch";
import { DispatchContext } from "../contexts/Contexts.jsx";

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
import frtImg1 from "../images/frontImage1.jpg";
import frtImg2 from "../images/frontImage2.jpg";
import frtImg3 from "../images/frontImage3.jpg";
import pic07 from "../images/pic07.jpg";
import pic08 from "../images/pic08.jpg";
import pic09 from "../images/pic09.jpg";

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
const Home = () => {
  const dispatch = useContext(DispatchContext);

  // Director DB에서 초기 데이터 불러오기
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

  useEffect(() => {
    fetchDirectorInfo();
    console.log("Home component useEffect실행");
  }, []);

  // material ui tap기능 활용 부분
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Tap 전환
  const chageTaps = (e) => {
    e.preventDefault();
    const elemID = e.target.dataset.id;
    const tapElement = document.getElementById(
      `scrollable-force-tab-${elemID}`
    );
    if (tapElement === null) {
      //가끔 element가 잘 안받아지는 경우 대비, 재귀함수 적용
      chageTaps(e);
    } else {
      tapElement.click();
    }
  };

  //Tap 전환효과 & Scroll 이동
  const chageTapsNscroll = (e) => {
    chageTaps(e);
    window.scroll({ top: 1700, behavior: "smooth" });
  };

  return (
    <div className="container">
      {/* <!-- Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Main --> */}
        <div id="main">
          <div className="inner">
            {/* <!-- Header --> */}
            <header id="header">
              <a href="index.html" className="logo">
                <strong>MyShamans</strong> : Let's memorize !
              </a>
              <ul className="icons">
                <li>
                  <a href="https://html5up.net/">
                    <i class="fas fa-drafting-compass"></i>
                    <span className="label"> Desinged by HTML5 UP </span>
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
                  <h2 className="korean">
                    이야기꾼은 만들어지지 않는다. <br /> 다만 타고날 뿐
                  </h2>
                </header>
                <p className="korean title">
                  쏟아지는 콘텐츠는 우리에게 '선택'의 짐을 안겼다.
                  <br /> 무엇을 보고 무엇을 들을 것인가.
                  <br /> 콘텐츠가 많아질수록 '타고난 이야기꾼'은 사라진다.{" "}
                  <br />
                  <br />
                  졸작의 숲에서 느꼈던 낯 뜨거움과 분노를 몰아내고자, 여기
                  그들의 발자취를 기록한다.
                  <br /> 부디 그들을 따라 걸으며 더이상의 답답함은 사라지기를.
                  <br /> 또 한번의 전율이 이 걸음에 함께 하기를.
                </p>
              </div>
              <span className="image object">
                <Carousel loop="true" auto interval="5000" duration="500">
                  <img src={frtImg1} alt="대문그림"></img>
                  <img src={frtImg2} alt="대문그림"></img>
                  <img src={frtImg3} alt="대문그림"></img>
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
                    <h3>
                      <a href="#" onClick={chageTapsNscroll} data-id="0">
                        Movie Directors &nbsp;&nbsp;GO&nbsp;
                        <i class="fas fa-chevron-right"></i>
                      </a>
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
                    <h3>
                      <a href="#" onClick={chageTapsNscroll} data-id="1">
                        Fiction Wirters &nbsp;&nbsp;GO&nbsp;
                        <i class="fas fa-chevron-right"></i>
                      </a>
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
                    <h3>
                      <a href="#" onClick={chageTapsNscroll} data-id="2">
                        Nonfiction Wirters &nbsp;&nbsp;GO&nbsp;
                        <i class="fas fa-chevron-right"></i>
                      </a>
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
                    <h3>
                      <a href="#" onClick={chageTapsNscroll} data-id="3">
                        The others &nbsp;&nbsp;GO&nbsp;
                        <i class="fas fa-chevron-right"></i>
                      </a>
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
                  centered
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab id="tap1" label="Movie Directors" {...a11yProps(0)} />
                  <Tab label="Fiction Writers" {...a11yProps(1)} />
                  <Tab label="NonFiction Writers" {...a11yProps(2)} />
                  <Tab label="The Others" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={classes.views}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <SectionDirector fetchDirectorInfo={fetchDirectorInfo} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  page2
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  page3
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  page4
                </TabPanel>
              </SwipeableViews>
            </div>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
        <div id="sidebar">
          <div className="inner">
            {/* <!-- Search bar --> */}
            <PageSearch />
            {/* <!-- Menu --> */}
            <nav id="menu">
              <header className="major">
                <h2>Menu</h2>
              </header>
              <ul>
                <li>
                  <a href="#" onClick={chageTapsNscroll} data-id="0">
                    Movie Directors&nbsp;&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="0">
                    Movie Directors Lists
                  </span>
                  <ul>
                    <li>
                      <a href="#searchNadd">➕ ADD NEW</a>
                    </li>
                    <MenuDirectorList />
                  </ul>
                </li>
                <li>
                  <a href="#" onClick={chageTapsNscroll} data-id="1">
                    Fiction Writers&nbsp;&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="1">
                    Fiction Writers Lists
                  </span>
                  <ul>
                    <li>
                      <a href="#">Lorem Dolor</a>
                    </li>
                    <li>
                      <a href="#">Ipsum Adipiscing</a>
                    </li>
                    <li>
                      <a href="#">Tempus Magna</a>
                    </li>
                    <li>
                      <a href="#">Feugiat Veroeros</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" onClick={chageTapsNscroll} data-id="2">
                    Nonfiction Writers&nbsp;&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="2">
                    Nonfiction Writers Lists
                  </span>
                  <ul>
                    <li>
                      <a href="#">Lorem Dolor</a>
                    </li>
                    <li>
                      <a href="#">Ipsum Adipiscing</a>
                    </li>
                    <li>
                      <a href="#">Tempus Magna</a>
                    </li>
                    <li>
                      <a href="#">Feugiat Veroeros</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" onClick={chageTapsNscroll} data-id="3">
                    The Others&nbsp;&nbsp;
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>
                <li>
                  <span className="opener" onClick={chageTaps} data-id="3">
                    The Others Lists
                  </span>
                  <ul>
                    <li>
                      <a href="#">Lorem Dolor</a>
                    </li>
                    <li>
                      <a href="#">Ipsum Adipiscing</a>
                    </li>
                    <li>
                      <a href="#">Tempus Magna</a>
                    </li>
                    <li>
                      <a href="#">Feugiat Veroeros</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            {/* <!-- Section --> */}
            <section>
              <header className="major">
                <h2>Ante interdum</h2>
              </header>
              <div className="mini-posts">
                <article>
                  <a href="#" className="image">
                    <img src={pic07} alt=""></img>
                  </a>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore aliquam.
                  </p>
                </article>
                <article>
                  <a href="#" className="image">
                    <img src={pic08} alt=""></img>
                  </a>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore aliquam.
                  </p>
                </article>
                <article>
                  <a href="#" className="image">
                    <img src={pic09} alt=""></img>
                  </a>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore aliquam.
                  </p>
                </article>
              </div>
              <ul className="actions">
                <li>
                  <a href="#" className="button">
                    More
                  </a>
                </li>
              </ul>
            </section>

            {/* <!-- Section --> */}
            <section>
              <header className="major">
                <h2>Get in touch</h2>
              </header>
              <p>
                Sed varius enim lorem ullamcorper dolore aliquam aenean ornare
                velit lacus, ac varius enim lorem ullamcorper dolore. Proin sed
                aliquam facilisis ante interdum. Sed nulla amet lorem feugiat
                tempus aliquam.
              </p>
              <ul className="contact">
                <li className="icon solid fa-envelope">
                  <a href="#">information@untitled.tld</a>
                </li>
                <li className="icon solid fa-phone">(000) 000-0000</li>
                <li className="icon solid fa-home">
                  1234 Somewhere Road #8254
                  <br />
                  Nashville, TN 00000-0000
                </li>
              </ul>
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
