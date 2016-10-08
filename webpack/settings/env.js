import url from "url"

// -------

const ensureProtocol = str => {
  str = str.replace(/^\/\//, "")
  return /^https?:\/\//.test(str) ? str : `http://${str}`
}

const parse = str => !str ? null :url.parse(ensureProtocol(str))

// -------

export default {
  prod: process.env.NODE_ENV === "production",

  hosts: {
    dev: parse(process.env.HOST || "localhost:3000"),
    api: parse(process.env.HOST_API),
    static: parse(process.env.HOST_STATIC),
  },
}
