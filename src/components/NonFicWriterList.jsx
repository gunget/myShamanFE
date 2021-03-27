import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

// List image
import frtImg1 from "../images/frontImage1.jpg";
import frtImg2 from "../images/frontImage2.jpg";
import frtImg3 from "../images/frontImage3.jpg";

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

// NonFicWriter Component
const NonFicWriterList = ({ fetchNonFicWriterInfo }) => {
  const states = useContext(StateContext);
  const classes = useStyles();

  const delPeopleCode = (e) => {
    e.preventDefault();

    const id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;

    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      axios
        .delete(`http://localhost:8000/api/nonFicWriterInfo/${id}/`)
        .then(() => {
          fetchNonFicWriterInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.nonFicWriterInitLoading
    ? "loading..."
    : states.nonFictionWriters.map((data) => {
        const link = `https://people.search.naver.com/search.naver?where=nexearch&query=${data.name}&sm=tab_etc&ie=utf8&key=PeopleService&os=${data.peopleCode}`;
        const linkBook = `https://book.naver.com/search/search.nhn?query=${data.name}`;
        let image = "";
        switch (data.job) {
          case "작가":
            image = frtImg2;
            break;
          case "철학자":
            image = frtImg1;
            break;
          case "교수":
            image = frtImg3;
            break;

          default:
            image = frtImg1;
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
                  title="NonFicWriters"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.name}{" "}
                    <Typography variant="overline">[ {data.job} ]</Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    각자의 분야에서 탁월한 식견을 보유한 작가들. '네이버
                    인물정보'와 '네이버 책정보'를 통해 그들의 저작들을 확인하고,
                    그들에게 당신의 시간을 투자하세요.
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
                  Go Naver People
                </Button>
                <Button
                  href={linkBook}
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                  color="default"
                >
                  Go Naver Books
                </Button>
                <Button onClick={delPeopleCode} size="small" color="secondary">
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

export default NonFicWriterList;
