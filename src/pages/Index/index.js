import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Loading from "../../components/Loading";

import Editor from "../../components/Editor";
import FullScreenDialog from "../../components/FullScreenDialog";
import fetch from "@/utils/fetch";
import "./index.scss";

function Index() {
  const list = useInitialList();
  const [html, setHtml] = useState(null);
  const [open, setOpen] = useState(false);
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

    // fetch({
    //   url: "/graphql",
    //   data: JSON.stringify(requestBody)
    // }).then(result => {
    //   console.log(result);
    // });

    fetch({
      url: "/graphql",
      method: "get",
      data: {
        query: "{hello}"
      }
    }).then(res => console.log(res));
  }, []);
  function openTextEditor() {
    setOpen(true);
  }
  function submitText() {
    setHtml();
  }
  return (
    <main className="main">
      {/* <TextField
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
      /> */}
      <Loading />
      <div className="wrapper">{renderList(list)}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Button
        className="round-button fixed-button"
        variant="contained"
        color="primary"
        onClick={openTextEditor}
      >
        <AddIcon />
      </Button>
      <FullScreenDialog
        open={open}
        saveText={submitText}
        closeDialog={() => {
          setOpen(false);
        }}
      >
        <section className="text-editor">
          <Editor onChange={html => setHtml(html)} />
        </section>
      </FullScreenDialog>
    </main>
  );
}

function useInitialList() {
  let len = 10;
  let list1 = [];

  while (len--) {
    list1.push({
      id: len,
      title: "guide",
      date: new Date().getTime()
    });
  }
  const [list, setList] = useState(list1);

  return list;
}

const myRef = React.createRef();

function renderList(list) {
  if (!list.length) {
    return <div className="flex-box">Oops</div>;
  }

  return list.map(d => {
    return (
      <div className="box-shadow-gray list-container" key={d.id}>
        <h3>{d.title}</h3>
        <p>{new Date(d.date).toLocaleString()}</p>
      </div>
    );
  });
}

export default Index;
