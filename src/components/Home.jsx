import React, { useEffect, useContext } from "react";
import Carousel from "re-carousel";
import ScrollUpButton from "react-scroll-up-button";

import axios from "axios";
import DirectorsList from "./DirectorsList";
import SearchDirector from "./SearchDirector";
import MenuDirectorList from "./MenuDirectorList";
import { DispatchContext } from "../contexts/Contexts.jsx";
import "../assets/css/main.css";
import "../assets/css/fontawesome-all.min.css";

import frtImg1 from "../images/frontImage1.jpg";
import frtImg2 from "../images/frontImage2.jpg";
import frtImg3 from "../images/frontImage3.jpg";
import pic07 from "../images/pic07.jpg";
import pic08 from "../images/pic08.jpg";
import pic09 from "../images/pic09.jpg";

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
                  쉴새없이 쏟아지는 콘텐츠는 우리에게 '선택'이란 짐을 안겼다.
                  무엇을 보고 무엇을 들을 것인가. 콘텐츠가 많아질수록 '타고난
                  이야기꾼'은 사라진다. 졸작의 숲에서 느꼈던 낯 뜨거움과 분노를
                  몰아내고자, 여기 그들의 발자취를 기록한다. 부디 그들을 따라
                  걸으며 더이상의 막막함은 없기를. 또 한번의 전율이 이 걸음에
                  함께 하기를.
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

            {/* <!-- Section Director --> */}
            <section>
              <header id="DirectorList" className="major">
                <h2>Movie Director</h2>
              </header>
              <div className="posts">
                <DirectorsList fetchDirectorInfo={fetchDirectorInfo} />
              </div>
            </section>
            {/* <!-- Section Search and Add --> */}
            <section>
              <header id="searchNadd" className="major">
                <h2>Search & Add New Director</h2>
              </header>
              <div className="searchNadd">
                <SearchDirector fetchDirectorInfo={fetchDirectorInfo} />
              </div>
            </section>
            {/* <!-- Section Footer--> */}
            <section>
              <header className="major">
                <h2>Contets</h2>
              </header>
              <div className="features">
                <article>
                  <span className="icon fa-gem"></span>
                  <div className="content">
                    <h3>Movie Director</h3>
                    <p>
                      Aenean ornare velit lacus, ac varius enim lorem
                      ullamcorper dolore. Proin aliquam facilisis ante interdum.
                      Sed nulla amet lorem feugiat tempus aliquam.
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-paper-plane"></span>
                  <div className="content">
                    <h3>Sapien veroeros</h3>
                    <p>
                      Aenean ornare velit lacus, ac varius enim lorem
                      ullamcorper dolore. Proin aliquam facilisis ante interdum.
                      Sed nulla amet lorem feugiat tempus aliquam.
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-rocket"></span>
                  <div className="content">
                    <h3>Quam lorem ipsum</h3>
                    <p>
                      Aenean ornare velit lacus, ac varius enim lorem
                      ullamcorper dolore. Proin aliquam facilisis ante interdum.
                      Sed nulla amet lorem feugiat tempus aliquam.
                    </p>
                  </div>
                </article>
                <article>
                  <span className="icon solid fa-signal"></span>
                  <div className="content">
                    <h3>Sed magna finibus</h3>
                    <p>
                      Aenean ornare velit lacus, ac varius enim lorem
                      ullamcorper dolore. Proin aliquam facilisis ante interdum.
                      Sed nulla amet lorem feugiat tempus aliquam.
                    </p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </div>
        {/* <!-- Sidebar --> */}
        <div id="sidebar">
          <div className="inner">
            {/* <!-- Search --> */}
            <section id="search" className="alt">
              <form method="post" action="#">
                <input
                  type="text"
                  name="query"
                  id="query"
                  placeholder="Search"
                />
              </form>
            </section>

            {/* <!-- Menu --> */}
            <nav id="menu">
              <header className="major">
                <h2>Menu</h2>
              </header>
              <ul>
                <li>
                  <a href="#DirectorList">Movie Directors</a>
                </li>
                <li>
                  <span className="opener">Movie Directors Lists</span>
                  <ul>
                    <MenuDirectorList />
                    <li>
                      <a href="#searchNadd">➕ ADD NEW</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="generic.html">Fiction Writers</a>
                </li>
                <li>
                  <span className="opener">Fiction Writers Lists</span>
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
                  <a href="elements.html">Nonfiction Writers</a>
                </li>
                <li>
                  <span className="opener">Nonfiction Writers Lists</span>
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

// 박훈정 102768
