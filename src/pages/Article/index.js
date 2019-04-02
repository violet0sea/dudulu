import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import Loading from "../../components/Loading"

import fetch from "@/utils/fetch"

function Article(props) {
  const [html, setHtml] = useState(null)
  useEffect(() => {
    const { match } = props
    const requestBody = {
      query: `query getArticle($id: String!) {
                article(id: $id) {
                  _id
                  title
                  content
                  dsa
                }
              }
            `,
      variables: {
        id: match.params.id
      }
    }

    fetch({
      url: "/graphql",
      data: JSON.stringify(requestBody)
    }).then(result => {
      const article = result.data.article
      if (article) {
        setHtml(article)
      }
    })
  }, [])

  if (!html) {
    return <Loading />
  }
  return (
    <main className="main">
      <h3>{html.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: html.content }} />
    </main>
  )
}

export default withRouter(Article)
