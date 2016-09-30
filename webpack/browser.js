import webpack from "webpack"
import settings from "./settings"
import { env } from "./utils"

import extend from "./base_config"

export default extend({
  entry: {
    [settings.paths.bundles.client]: "index.js"
  },

  output: {
    path: settings.paths.root.dist.client,
  },

  // Fastest tool as for incremental builds
  // Columns mapping is lost, but don't think it really matters
  devtool: env.dev("#cheap-module-source-map"),

  plugins: [
    new webpack.DefinePlugin({
      // Don't forget to provide this to make bundle work in prod mode
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
})
