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
import axios from "axios"

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
  const [list, setList] = useState([
    {
      id: 1,
      title: "A Complete Guide to useEffect",
      date: new Date().getTime()
    }
  ])

  useEffect(() => {
    axios.get("http://47.101.151.108:9000/api/v1").then(res => {
      setList((res.data.data && res.data.data.entries) || [])
    })
  }, [])

  return list
}

const myRef = React.createRef()

function renderList(list) {
  if (!list.length) {
    return <div className="flex-box">Oops</div>
  }

  return list.map(d => {
    return (
      <Card className="list-container" key={d.id}>
        <CardActionArea>
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
    )
  })
}

export default Index
