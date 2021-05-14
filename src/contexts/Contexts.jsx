import { createContext, useReducer } from "react";

export const StateContext = createContext();
export const DispatchContext = createContext();

function Reducer(states, { type, payload }) {
  switch (type) {
    case "SET_DRT_INIT_DATA":
      return {
        ...states,
        directors: payload,
      };
    case "DRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          directorInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_FWRT_INIT_DATA":
      return {
        ...states,
        fictionWriters: payload,
      };
    case "FWRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          ficWriterInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_NFWRT_INIT_DATA":
      return {
        ...states,
        nonFictionWriters: payload,
      };
    case "NFWRT_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          nonFicWriterInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    case "SET_OTHERS_INIT_DATA":
      return {
        ...states,
        others: payload,
      };
    case "OTHERS_INIT_LOADING_TOGGLE":
      return {
        ...states,
        loadings: {
          ...states.loadings,
          othersInitLoading: payload,
          // directorInitLoading: !states.loadings.directorInitLoading,
        },
      };
    // '객체 속 객체' 중 일부만 바꾸는 방법
    // const array = { a : 1, b : { key: 1, val: 2 }, c : false }
    // const array5 = {...array, b:{...array.b, val:8}
    case "SET_JWT":
      return { ...states, jwt: payload };
    case "SET_SEARCH_NAME":
      return { ...states, searchName: payload };
    case "SET_PEOPLE_CODE":
      return { ...states, peopleCode: payload };
    case "SET_RANDOM_JOKE":
      return { ...states, randJoke: payload };

    default:
      throw new Error("UnHandled Action!");
  }
}

function Store({ children }) {
  const [states, dispatch] = useReducer(Reducer, {
    directors: [],
    fictionWriters: [],
    nonFictionWriters: [],
    others: [],
    loadings: {
      directorInitLoading: true,
      ficWriterInitLoading: true,
      nonFicWriterInitLoading: true,
      othersInitLoading: true,
      generalLoading: true,
    },
    jwt: "",
    searchName: "",
    peopleCode: "",
    randJoke: "",
    searchDetails: {
      drt: {
        params: {
          search: "searchWtr",
          jobs: "영화감독",
        },
        url: {
          searchUrl: "getPpMovie",
          saveUrl: "directorInfo",
        },
        optionList: [
          "한국",
          "북아메리카",
          "남아메리카",
          "유럽",
          "아시아",
          "기타",
        ],
        useJoke: true,
        texts: {
          subText: "네이버 영화검색 코드",
          infoText: () => {
            return (
              <blockquote>
                - 0은 검색결과가 없다는 의미입니다. <br /> &nbsp;&nbsp;이름을
                바꿔 검색하세요.
                <br />- 번호가 나오면 다음단계로 진행하세요.
                <br />- 검색이 잘 안되면{" "}
                <a id="open" style={{ cursor: "pointer" }}>
                  여기
                </a>
                를 눌러 직접 입력하세요.
              </blockquote>
            );
          },
          modalText: () => {
            return (
              <blockquote>
                1.{" "}
                <a href="https://movie.naver.com/" target="_blank">
                  네이버 영화
                </a>
                &nbsp;-&nbsp;영화검색에서 '영화제목'으로 검색, 감독 찾기
                <br />
                2. '감독정보'창으로 들어가면 브라우저의 주소줄 클릭하기
                <br />
                3. 주소줄 끝부분의 'code=XXX'에서 XXX 번호 기억하기
                <br />
                4. 감독이름과 번호를 입력하고 저장하기
              </blockquote>
            );
          },
          selectText: "출신 지역",
          selectInfoText: "감독의 출신 지역",
        },
      },
      wrt: {
        params: {
          search: "searchWtr",
          jobs: ["드라마작가", "소설가", "만화가"],
        },
        url: {
          searchUrl: "getPpWriter",
          saveUrl: "ficWriterInfo",
        },
        optionList: ["드라마작가", "소설가", "만화가", "기타"],
        useJoke: false,
        texts: {
          subText: "네이버 인물검색 코드",
          infoText: () => {
            return (
              <blockquote>
                - 검색어 입력 시 직업까지 입력하면 결과가 정확해 집니다(ex.
                홍길동작가)
                <br />
                - 0은 검색결과가 없다는 의미입니다.
                <br />- 번호가 나오면 다음단계로 진행하세요.
                <br />- 검색이 잘 안되면{" "}
                <a id="open" style={{ cursor: "pointer" }}>
                  여기
                </a>
                를 눌러 직접 입력하세요.
              </blockquote>
            );
          },
          modalText: () => {
            return (
              <blockquote>
                1.{" "}
                <a href="https://people.search.naver.com/" target="_blank">
                  네이버 인물검색
                </a>
                에서 작가 이름검색, 동명이인 중 해당인물 찾기
                <br />
                2. '인물정보'창으로 들어가면 브라우저의 주소줄 클릭하기
                <br />
                3. 주소줄 중간의 'query=이름&os=XXXX'에서 XXXX 번호 기억하기
                <br />
                4. 이름과 번호를 입력하고 저장하기
              </blockquote>
            );
          },
          selectText: "직업명",
          selectInfoText: "작가의 직업",
        },
      },
      nwrt: {
        params: {
          search: "searchWtr",
          jobs: ["교수", "철학자", "작가"],
        },
        url: {
          searchUrl: "getPpWriter",
          saveUrl: "nonFicWriterInfo",
        },
        optionList: ["교수", "철학자", "작가", "기타"],
        useJoke: false,
        texts: {
          subText: "네이버 인물검색 코드",
          infoText: () => {
            return (
              <blockquote>
                - 검색어 입력 시 직업까지 입력하면 결과가 정확해 집니다(ex.
                홍길동교수)
                <br />
                - 0은 검색결과가 없다는 의미입니다.
                <br />- 번호가 나오면 다음단계로 진행하세요.
                <br />- 검색이 잘 안되면{" "}
                <a id="open" style={{ cursor: "pointer" }}>
                  여기
                </a>
                를 눌러 직접 입력하세요.
              </blockquote>
            );
          },
          modalText: () => {
            return (
              <blockquote>
                1.{" "}
                <a href="https://people.search.naver.com/" target="_blank">
                  네이버 인물검색
                </a>
                에서 작가 이름검색, 동명이인 중 해당인물 찾기
                <br />
                2. '인물정보'창으로 들어가면 브라우저의 주소줄 클릭하기
                <br />
                3. 주소줄 중간의 'query=이름&os=XXXX'에서 XXXX 번호 기억하기
                <br />
                4. 이름과 번호를 입력하고 저장하기
              </blockquote>
            );
          },
          selectText: "직업명",
          selectInfoText: "작가의 직업",
        },
      },
    },
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={states}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Store;
