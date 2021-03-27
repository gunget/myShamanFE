import React, { useState, useRef } from "react";
import axios from "axios";
import QueryString from "qs";

const SearchOthers = ({ fetchNonFicWriterInfo }) => {
  const [peopleCode, setPeopleCode] = useState("You don't seach anything yet.");
  const [job, setJob] = useState("철학자");

  const inputRef = useRef(null);

  const savePeopleCode = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("name", inputRef.current.value);
    data.append("peopleCode", Number(peopleCode));
    data.append("job", job);
    await axios
      .post("http://127.0.0.1:8000/api/nonFicWriterInfo/", data) // (url, data, 헤더정보)순
      .then(() => {
        setPeopleCode("You don't seach anything yet.");
        inputRef.current.value = "";
        fetchNonFicWriterInfo();
      })
      .catch((error) => {
        console.log(error);
        setPeopleCode("저장할 수 없습니다.");
      });
  };

  const handelSelect = (e) => {
    e.preventDefault();
    setJob(e.target.value);
  };

  return (
    <div>
      <form method="post" action="#">
        <div class="row gtr-uniform">
          <div class="col-6 col-12-xsmall">
            <input
              type="text"
              name="demo-name"
              id="demo-name"
              value=""
              placeholder="Name"
            />
          </div>
          <div class="col-6 col-12-xsmall">
            <input
              type="email"
              name="demo-email"
              id="demo-email"
              value=""
              placeholder="Email"
            />
          </div>
          <div class="col-12">
            <select name="demo-category" id="demo-category">
              <option value="">- Category -</option>
              <option value="1">Manufacturing</option>
              <option value="1">Shipping</option>
              <option value="1">Administration</option>
              <option value="1">Human Resources</option>
            </select>
          </div>
          <div class="col-12">
            <textarea
              name="demo-message"
              id="demo-message"
              placeholder="Enter your message"
              rows="6"
            ></textarea>
          </div>
          <div class="col-12">
            <ul class="actions">
              <li>
                <input type="submit" value="Send Message" class="primary" />
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
