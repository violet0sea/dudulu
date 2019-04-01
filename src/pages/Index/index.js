import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Editor from "../../components/Editor";
import fetch from "@/utils/fetch";
import "./index.scss";

function Index() {
  const list = useInitialList();
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const requestBody = {
      query: `query {
                    events {
                        _id
                        title
                        description
                        date
                    }
                }
            `
    };

    fetch({
      url: "/graphql",
      data: JSON.stringify(requestBody)
    }).then(result => {
      console.log(result);
    });

    fetch({
      url: "/graphql",
      method: "get",
      data: {
        query: "{hello}"
      }
    }).then(res => console.log(res));
  }, []);

  return (
    <main className="main">
      <TextField
        id="outlined-name"
        margin="normal"
        variant="outlined"
        placeholder="发现"
        fullWidth
      />
      <div className="wrapper">{renderList(list)}</div>
      <Editor onChange={html => setHtml(html)} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <img src="./share.jpg" />
    </main>
  );
}

function useInitialList() {
  const [list, setList] = useState([]);

  // useEffect(() => {
  //     axios.get('http://47.101.151.108:9000/api/v1')
  //     .then(res => {
  //         setList(res.data.data && res.data.data.entries || [])
  //     });
  // }, []);

  return list;
}

const myRef = React.createRef();

function renderList(list) {
  if (!list.length) {
    return (
      <div className="flex-box">
        <input ref={myRef} />
      </div>
    );
  }

  return list.map(d => {
    return (
      <Card className="list-container">
        <CardActionArea>
          <CardMedia
            className="list-image"
            component="img"
            image={d.images.small}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {d.title}
            </Typography>
            <Typography component="p">{d.rating}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  });
}

export default Index;
