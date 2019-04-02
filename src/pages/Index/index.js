import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import { withRouter } from "react-router-dom"

import Loading from "../../components/Loading"
import Editor from "../../components/Editor"
import FullScreenDialog from "../../components/FullScreenDialog"
import fetch from "@/utils/fetch"
import "./index.scss"

function Index() {
  const [html, setHtml] = useState(null)
  const [open, setOpen] = useState(false)
  const [articles, setArticles] = useState([])
  useEffect(() => {
    const requestBody = {
      query: `query {
                homeList {
                  _id
                  title
                  content
                  createdAt
                }
              }
            `
    }

    fetch({
      url: "/graphql",
      data: JSON.stringify(requestBody)
    }).then(result => {
      setArticles(result.data.homeList)
    })
  }, [])
  function openTextEditor() {
    setOpen(true)
  }
  function submitText() {
    const requestBody = {
      query: `mutation createArticle($title: String!, $content: String!) {
                createArticle(articleInput: {title: $title, content: $content}) {
                  title
                  content
                }
              }
            `,
      variables: {
        title: "React",
        content: html
      }
    }

    fetch({
      url: "/graphql",
      data: JSON.stringify(requestBody)
    }).then(result => {
      console.log(result)
    })
  }

  if (articles.length === 0) {
    return <Loading />
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

      /> */}

      <div className="wrapper">{renderList({ list: articles })}</div>
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
          setOpen(false)
        }}
      >
        <section className="text-editor">
          <Editor onChange={html => setHtml(html)} />
        </section>
      </FullScreenDialog>
    </main>
  )
}

function gotoDetail(history, id) {
  return () => history.push(`/article/${id}`)
}

const renderList = withRouter(function(props) {
  const { history, list } = props
  if (!list.length) {
    return <div className="flex-box">Oops, can not get any data</div>
  }
  return list.map(d => {
    return (
      <div
        className="box-shadow-gray list-container"
        key={d._id}
        onClick={gotoDetail(history, d._id)}
      >
        <h3>{d.title}</h3>
        <p>{new Date(d.createdAt).toLocaleString()}</p>
      </div>
    )
  })
})

export default Index
