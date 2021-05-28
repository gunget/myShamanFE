import React, { useRef, useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

const SearchOthers = ({ fetchOthersInfo }) => {
  const nameRef = useRef("홍길동");
  const jobRef = useRef("캐릭터");
  const descriptionRef = useRef("소설 속 인물");

  const states = useContext(StateContext);
  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
  };

  const saveDB = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", nameRef.current.value);
    data.append("job", jobRef.current.value);
    data.append("description", descriptionRef.current.value);
    await axios
      .post("https://myshaman.herokuapp.com/api/othersInfo/", data, config) // (url, data, 헤더정보)순
      .then(() => {
        nameRef.current.value = "";
        jobRef.current.value = "";
        descriptionRef.current.value = "";
        fetchOthersInfo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container search2">
      <form method="post" action="#">
        <div class="row gtr-uniform">
          <div class="col-6 col-12-xsmall">
            <input
              type="text"
              name="demo-name"
              id="demo-name"
              ref={nameRef}
              placeholder="이름을 입력하세요."
            />
          </div>
          <div class="col-6 col-12-xsmall">
            <input
              type="text"
              name="demo-job"
              id="demo-job"
              ref={jobRef}
              placeholder="직업을 입력하세요."
            />
          </div>
          <div class="col-12">
            <textarea
              name="demo-description"
              id="demo-description"
              ref={descriptionRef}
              placeholder="인물의 관련정보를 입력하세요."
              rows="5"
            ></textarea>
          </div>
          <div class="col-12">
            <ul class="actions">
              <li>
                <input
                  type="submit"
                  value="submit"
                  onClick={saveDB}
                  class="primary"
                />
              </li>
              <li>
                <input type="reset" value="Reset" />
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchOthers;
