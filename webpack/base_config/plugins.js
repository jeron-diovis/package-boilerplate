import webpack from "webpack"
import settings from "../settings"
import { env } from "../utils"

import WebpackInfoPlugin from "webpack-info-plugin"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

export default [
  // Define magic global variables
  new webpack.DefinePlugin({
    __DEBUG__: env.dev(),
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: settings.paths.bundles.vendor,
    minChunks: Infinity,
  }),

  new WebpackInfoPlugin({
    stats: {
      colors: true,
      version: false,
      hash: false,
      timings: false,
      assets: false,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    state: true
  }),

  ...env.dev.list([
    new WebpackErrorNotificationPlugin()
  ]),

  // @link http://webpack.github.io/docs/list-of-plugins.html#optimize
  ...env.prod.list([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // not interested in warnings about not optimal code from depth of vendor libs
      }
    }),
  ])
]
