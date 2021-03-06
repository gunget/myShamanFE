import React, { useRef } from "react";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//1. material ui CSS overriding 방법
//컴포넌트들은 classes att로 기본 Css를 바꿀 수 있는데, 바꾸려면 해당 컴포넌트의
//className이 DevTool상 뭐라고 나오는지 알아야 한다
//보통 'Mui컴포넌트종류명-root등의 rule명'으로 여러개가 나오는데, 이중 하나만 매치시키면 된다
//이걸 clsss={{root: classes.root}}형식으로 컴포넌트에 넣어서 갈아 끼우는 것
//주의할 점은 input이나 inputBase처럼 DevTool상에는 나오는데 코드에서는 접근 불가능한
//경우도 있는데, 이것은 해당컴포넌트가 이들을 상속받고 있는 것이므로, 따라가서 rule명을 확인하면 된다
//대게는 root를 쓰면 그냥 적용될 듯

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "inherit",
    fontWeight: "800",
    fontSize: "0.7em",
    letterSpacing: "0.5px",
    opacity: "0.7",
    textTransform: "uppercase",
  },
  formControl: {
    minWidth: 120,
    width: "95%",
    marginLeft: "7px",
  },
  label: {
    fontFamily: "inherit",
    fontWeight: "500",
  },
  menuitem: {
    fontFamily: "inherit",
    fontWeight: "500",
    fontSize: "1em",
    letterSpacing: "0.5px",
  },
}));

const PageSearch = ({ handleChange }) => {
  const inputRef = useRef();

  const handleFind = (e) => {
    e.preventDefault();
    const titleElem = document.getElementById(inputRef.current.value);
    if (titleElem) {
      titleElem.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      inputRef.current.value = "찾는 인물이 없습니다.";
    }
  };

  // LandingPgae의 URL이 '/'인 경우 ID로 바로 이동할 수 있는 방법
  // const handleFind = (e) => {
  //   e.preventDefault();
  //   const element = document.createElement("a");
  //   element.setAttribute("href", `#${inputRef.current.value}`);
  //   element.click();
  // };

  //material ui
  const classes = useStyles();

  //select전환 시 화면이 해당 카테고리로 넘어가도록 설정
  const selectChange = (e) => {
    const selectID = Number(e.target.value);
    handleChange(null, selectID);
  };

  return (
    <section id="search" className="alt">
      <FormControl className={classes.formControl}>
        <InputLabel
          id="demo-simple-select-label"
          classes={{ root: classes.label }}
        >
          CATEGORY
        </InputLabel>
        <Select
          classes={{
            root: classes.root,
          }} //상속받은 컴포넌트의 root에도 이게 적용된다.
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          autoWidth="true"
          onChange={selectChange}
        >
          <MenuItem classes={{ root: classes.menuitem }} value={0}>
            Movie Director
          </MenuItem>
          <MenuItem classes={{ root: classes.menuitem }} value={1}>
            Fiction Writer
          </MenuItem>
          <MenuItem classes={{ root: classes.menuitem }} value={2}>
            Nonfiction Writer
          </MenuItem>
          <MenuItem classes={{ root: classes.menuitem }} value={3}>
            The Others
          </MenuItem>
        </Select>
      </FormControl>
      <form method="post" action="#" onSubmit={handleFind}>
        <input
          type="text"
          name="query"
          id="query2"
          placeholder="이름 검색 (Full Name)"
          ref={inputRef}
        />
      </form>
    </section>
  );
};

export default PageSearch;
