import axios from "axios"

import { baseUrl } from "./constant"

async function fetch(params) {
  const { method = "post", url, data } = params

  let response
  let config = {
    method,
    url,
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json"
    }
  }

  if (method === "post" || method === "put") {
    config.data = data
  } else {
    config.params = data
  }
  try {
    response = await axios(config)
  } catch (err) {
    console.error(111, err, performance.now())
  }

  console.log(response)
  return response.data
}

export default fetch
