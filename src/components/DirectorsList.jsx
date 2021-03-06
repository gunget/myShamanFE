import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";
import Loading from "./Loading";
import { url } from "./url.js";

// List image
import globalImgs from "../images/globalImgs";

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

  const config = {
    headers: {
      Authorization: `jwt ${states.jwt.token}`,
    },
  };

  const delPeopleCode = (e) => {
    e.preventDefault();

    const id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(`${url}/api/directorInfo/${id}/`, config)
        .then(() => {
          fetchDirectorInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.directorInitLoading ? (
    <Loading />
  ) : (
    states.directors.map((data) => {
      const link = `https://movie.naver.com/movie/bi/pi/filmo.nhn?code=${data.peopleCode}#tab`;

      let image = "";
      switch (data.area) {
        case "한국":
          image = globalImgs.drtKorImg;
          break;
        case "북아메리카":
          image = globalImgs.drtNthAmImg;
          break;
        case "남아메리카":
          image = globalImgs.drtSthAmImg;
          break;
        case "유럽":
          image = globalImgs.drtUrpImg;
          break;
        case "아시아":
          image = globalImgs.drtAsnImg;
          break;

        default:
          image = globalImgs.etc;
          break;
      }

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
                image={image}
                title="from artvee.com"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.name}{" "}
                  <Typography variant="overline">[ {data.area} ]</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  대표작 : {data.majorWorks}&nbsp;&nbsp;
                  <i class="fas fa-camera-retro"></i>
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
    })
  );
  return <>{list}</>;
};

export default DirectorsList;
