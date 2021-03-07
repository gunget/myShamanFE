import React, { useRef } from "react";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: "95%",
    marginLeft: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PageSearch = ({ chageTaps }) => {
  const inputRef = useRef();

  const handleFind = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    element.setAttribute("href", `#${inputRef.current.value}`);
    element.click();
  };

  //material ui
  const classes = useStyles();
  // const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    // setAge(event.target.value);
    return chageTaps(event, event.target.value);
  };

  return (
    <section id="search" className="alt">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={handleChange}
        >
          <MenuItem value={0}>Movie Director</MenuItem>
          <MenuItem value={1}>Fiction Writer</MenuItem>
          <MenuItem value={2}>Nonfiction Writer</MenuItem>
          <MenuItem value={3}>The Others</MenuItem>
        </Select>
      </FormControl>
      <form method="post" action="#" onSubmit={handleFind}>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="이름 검색 (Full Name)"
          ref={inputRef}
        />
      </form>
    </section>
  );
};

export default PageSearch;
