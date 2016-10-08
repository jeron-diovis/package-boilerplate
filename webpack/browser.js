import webpack from "webpack"
import settings from "./settings"
import { merge, env } from "./utils"
import base from "./base_config"

export default merge({}, base, {
  entry: {
    [settings.paths.bundles.client]: "index.js",
  },

  output: {
    path: settings.paths.dist.client,
  },

  // Fastest tool as for incremental builds
  // Columns mapping is lost, but don't think it really matters
  devtool: env.dev("#cheap-module-source-map"),

  plugins: [
    new webpack.DefinePlugin({
      // there is EnvironmentPlugin for this, but it spits useless warnings when var is not defined
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
})
