import React, { useState, useEffect } from "react"

import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import Loading from "../../components/Loading"

import Editor from "../../components/Editor"
import FullScreenDialog from "../../components/FullScreenDialog"

import "./index.scss"

function Index() {
  const list = useInitialList()
  const [html, setHtml] = useState(null)
  const [open, setOpen] = React.useState(false)

  function openTextEditor() {
    setOpen(true)
  }
  function submitText() {
    console.log(html)
    setHtml()
  }
  console.log(html)
  return (
    <main className="main">
      {/* <TextField
        id="outlined-name"
        margin="normal"
        variant="outlined"
        placeholder="发现"
        fullWidth
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

function useInitialList() {
  let len = 10
  let list1 = []

  while (len--) {
    list1.push({
      id: len,
      title: "guide",
      date: new Date().getTime()
    })
  }
  const [list, setList] = useState(list1)

  return list
}

const myRef = React.createRef()

function renderList(list) {
  if (!list.length) {
    return <div className="flex-box">Oops</div>
  }

  return list.map(d => {
    return (
      <div className="box-shadow-gray list-container" key={d.id}>
        <h3>{d.title}</h3>
        <p>{new Date(d.date).toLocaleString()}</p>
      </div>
    )
  })
}

export default Index
