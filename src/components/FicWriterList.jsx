import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

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
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

// FicWriter Component
const FicWriterList = ({ fetchFicWriterInfo }) => {
  const states = useContext(StateContext);
  const classes = useStyles();

  console.log("ficWritersList comp", states.fictionWriters);

  const delPeopleCode = (e) => {
    e.preventDefault();

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(
          `http://localhost:8000/api/ficWriterInfo/${e.target.dataset.id}/`
        )
        .then(() => {
          fetchFicWriterInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.FicWriterInitLoading
    ? "loading..."
    : states.fictionWriters.map((data) => {
        const link = `https://people.search.naver.com/search.naver?where=nexearch&query=${data.name}&sm=tab_etc&ie=utf8&key=PeopleService&os=${data.peopleCode}`;

        return (
          <article
            id={data.name}
            key={data.id}
            data-id={data.id}
            data-peoplecode={data.peopleCode}
          >
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  href={link}
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
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
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button href={link} size="small" color="primary">
                  Go Naver Search
                </Button>
                <Button
                  data-id={data.id}
                  onClick={delPeopleCode}
                  size="small"
                  color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
            {/* <div>
              <a
                href="#"
                data-id={data.id}
                onClick={delPeopleCode}
                className="button"
              >
                <i class="fas fa-trash-alt"></i>&nbsp;&nbsp;delete
              </a>
            </div> */}
          </article>
        );
      });
  return <>{list}</>;
};

export default FicWriterList;
