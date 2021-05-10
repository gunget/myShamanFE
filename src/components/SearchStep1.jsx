import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";
import { DispatchContext } from "../contexts/Contexts.jsx";

const SearchStep1 = () => {
  const [peopleCode, setPeopleCode] = useState("Nothing Searched.");
  const states = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef();

  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
  };

  const getPeopleCode = async (e) => {
    e.preventDefault();
    setPeopleCode("Now Searching...");
    await axios
      .get(
        "http://127.0.0.1:8000/getPpMovie/",
        {
          params: {
            searchDrt: inputRef.current.value,
          },
        },
        config
      )
      .then((res) => {
        setPeopleCode(res.data);
        dispatch({ type: "SET_SEARCH_NAME", payload: inputRef.current.value });
        dispatch({ type: "SET_PEOPLE_CODE", payload: res.data });
      })
      .then((res) => {
        axios
          .get("https://icanhazdadjoke.com/", {
            headers: {
              Accept: "application/json",
            },
          })
          .then((respose) => {
            const temp = respose.data.joke;
            if (temp) {
              dispatch({ type: "SET_RANDOM_JOKE", payload: temp });
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다. 다시 검색하세요.");
      });
  };

  //modal control
  useEffect(() => {
    const openBtn = document.querySelector("#open");
    const closeBtn = document.querySelector("#close");
    const container = document.querySelector(".modal_container");

    openBtn.addEventListener("click", () => {
      container.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      container.classList.remove("show");
    });
  });

  return (
    <div className="container search2">
      <div id="search2" className="alt">
        <form method="post" action="#" onSubmit={getPeopleCode}>
          <input
            type="text"
            name="query"
            id="query"
            placeholder="감독 이름을 입력하세요."
            ref={inputRef}
          />
          <div class="button" onClick={getPeopleCode}>
            Search
          </div>
        </form>
      </div>
      <div className="alt2">
        <sup className="korean"> 네이버영화 감독코드</sup>
        <p
          className="korean"
          style={{
            color: "#f56a6a",
            fontSize: "1.5em",
            marginBottom: "1em",
            fontWeight: "700",
          }}
        >
          {peopleCode}
        </p>
        <blockquote>
          - 0은 검색결과가 없다는 의미입니다. <br /> &nbsp;&nbsp;이름을 바꿔
          검색하세요.
          <br />- 번호가 나오면 다음단계로 진행하세요.
          <br />- 번호를 직접 입력하려면{" "}
          <a id="open" style={{ cursor: "pointer" }}>
            여기
          </a>
          를 눌러주세요.
        </blockquote>
      </div>
      <div class="modal_container">
        <div class="modal">
          <h3>직접 검색하기</h3>
          <blockquote>
            1.{" "}
            <a href="https://movie.naver.com/" target="_blank">
              네이버 영화
            </a>
            &nbsp;-&nbsp;영화검색에서 '작품명'으로 검색, 감독 찾기
            <br />
            2. '감독정보'창으로 들어가면 브라우저의 주소줄 클릭하기
            <br />
            3. 주소줄 끝부분의 'code='이후의 번호 기억하기
          </blockquote>
          <form method="post" action="#" onSubmit={getPeopleCode}>
            <input
              type="text"
              name="query"
              id="query"
              placeholder="감독 이름을 입력하세요."
              ref={inputRef}
            />
            <div class="button" onClick={getPeopleCode}>
              Search
            </div>
          </form>
          <div class="button" id="close">
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStep1;
