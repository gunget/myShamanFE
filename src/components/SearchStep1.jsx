import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import QueryString from "qs"; //axios.get으로 array를 보낼때 사용하는 library
import { StateContext } from "../contexts/Contexts.jsx";
import { DispatchContext } from "../contexts/Contexts.jsx";

const SearchStep1 = ({ sectionType }) => {
  const [peopleCode, setPeopleCode] = useState("Nothing Searched.");
  const states = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const sectionStates = states.searchDetails[sectionType];

  const inputRef = useRef();
  const inputModalName = useRef();
  const inputModalCode = useRef();
  const inputModalBtn = useRef();

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
        `http://127.0.0.1:8000/${sectionStates.url.searchUrl}/`,
        {
          params: {
            searchWtr: inputRef.current.value,
            searchDrt: inputRef.current.value,
            jobs: sectionStates.params.jobs,
          },
          paramsSerializer: (params) => {
            return QueryString.stringify(params);
          }, // 각각 jobs[0], jobs[1], jobs[2]라는 key로 보내진다. 단, 서버 쪽에서도 각각 받아와야해서 비효율적
        },
        config
      )
      .then((res) => {
        setPeopleCode(res.data);
        dispatch({ type: "SET_SEARCH_NAME", payload: inputRef.current.value });
        dispatch({ type: "SET_PEOPLE_CODE", payload: res.data });
      })
      .then((res) => {
        if (sectionStates.useJoke) {
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
              } else {
                //서버가 안돼서 값을 받아오지 못했다면
                dispatch({
                  type: "SET_RANDOM_JOKE",
                  payload: "All things flow and nothing is permanent.",
                });
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("검색 결과가 없습니다. 다시 검색하세요.");
      });
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    setPeopleCode(inputModalCode.current.value);
    dispatch({
      type: "SET_SEARCH_NAME",
      payload: inputModalName.current.value,
    });
    dispatch({
      type: "SET_PEOPLE_CODE",
      payload: inputModalCode.current.value,
    });
    inputModalBtn.current.click();
    inputRef.current.value = String(inputModalName.current.value);
    dispatch({
      type: "SET_RANDOM_JOKE",
      payload: "Simple is always the best!",
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
            placeholder="검색할 이름을 입력하세요."
            ref={inputRef}
          />
          <div class="button" onClick={getPeopleCode}>
            Search
          </div>
        </form>
      </div>
      <div className="alt2">
        <sup className="korean">{sectionStates.texts.subText}</sup>
        <p className="korean">{peopleCode}</p>
        {sectionStates.texts.infoText()}
      </div>
      <div class="modal_container">
        <div class="modal">
          <h3>Search Manually</h3>
          {sectionStates.texts.modalText()}
          <form method="post" action="#" id="modal-form">
            <input
              type="text"
              name="name"
              placeholder="이름"
              ref={inputModalName}
            />
            <input
              type="number"
              name="peopleCode"
              placeholder="코드"
              ref={inputModalCode}
            />
            <div class="button" onClick={handleModalSave}>
              save
            </div>
          </form>
          <div id="close" ref={inputModalBtn}>
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStep1;
