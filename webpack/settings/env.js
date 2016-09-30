import url from "url"

const default_host = "localhost"
const default_port = 9900

const server_host = process.env.HOST || default_host
const server_port = parseInt(process.env.PORT) || default_port

// -------

const composeHost = (hostname, port) => ({
  name: hostname,
  port,
  url: url.format({ protocol: "http", hostname, port }),
})

// -------

export default {
  prod: process.env.NODE_ENV === "production",

  hosts: {
    server: composeHost(server_host, server_port),
    // for webpack-dev-server only:
    dev: composeHost(
      process.env.HOST_DEV || default_host,
      parseInt(process.env.PORT_DEV) || default_port + 10
    ),
    api: composeHost(
      process.env.HOST_API || server_host,
      process.env.PORT_API || server_port
    ),
    static: composeHost(
      process.env.HOST_STATIC || server_host,
      process.env.PORT_STATIC || server_port
    ),
  },
}
