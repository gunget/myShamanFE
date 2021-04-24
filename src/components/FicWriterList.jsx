import React, { useContext } from "react";
import axios from "axios";
import { StateContext } from "../contexts/Contexts.jsx";

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

// FicWriter Component
const FicWriterList = ({ fetchFicWriterInfo }) => {
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
        .delete(`http://localhost:8000/api/ficWriterInfo/${id}/`, config)
        .then(() => {
          fetchFicWriterInfo();
        })
        .catch((err) => console.log("삭제실패:", err));
    }
  };
  const list = states.loadings.ficWriterInitLoading
    ? "loading..."
    : states.fictionWriters.map((data) => {
        const link = `https://people.search.naver.com/search.naver?where=nexearch&query=${data.name}&sm=tab_etc&ie=utf8&key=PeopleService&os=${data.peopleCode}`;
        let image = "";
        switch (data.job) {
          case "드라마작가":
            image = globalImgs.ficDrmImg;
            break;
          case "소설가":
            image = globalImgs.ficNvImg;
            break;
          case "만화가":
            image = globalImgs.ficCrtnImg;
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
                  title="FicWriters"
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
                    Fiction 생산에 탁월한 재능을 가진 작가들. '네이버 인물정보
                    '를 통해 그들이 만들어온 작품들을 감상하고, 그들에게 당신의
                    시간을 투자하세요.
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
                  Go Naver Search
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

export default FicWriterList;
