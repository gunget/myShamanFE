import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

// List image
import frtImg2 from "../images/frontImage2.jpg";

// material ui import
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "0 auto",
  },
  media: {
    height: 140,
  },
});

const DirectorsList = ({ fetchDirectorInfo }) => {
  const states = useContext(StateContext);
  const classes = useStyles();

  const delPeopleCode = (e) => {
    e.preventDefault();

    const id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(`http://localhost:8000/api/directorInfo/${id}/`)
        .then(() => {
          fetchDirectorInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.directorInitLoading
    ? "loading..."
    : states.directors.map((data) => {
        const link = `https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`;

        return (
          <article
            id={data.name}
            key={data.id}
            data-id={data.id}
            data-peoplecode={data.peopleCode}
          >
            <Card className={classes.root}>
              <CardActionArea href={link} target="_blank" rel="noreferrer">
                <CardMedia
                  className={classes.media}
                  image={data.image}
                  title="from artvee.com"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.wisesaying}&nbsp; &nbsp;
                    <i class="far fa-grin-squint-tears"></i>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions data-id={data.id}>
                <Button
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                  color="primary"
                >
                  Go Naver Movie
                </Button>
                <Button onClick={delPeopleCode} size="small" color="secondary">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </article>
        );
      });
  return <>{list}</>;
};

export default DirectorsList;
