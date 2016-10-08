import webpack from "webpack"
import settings from "../settings"
import { env } from "../utils"

import WebpackErrorNotificationPlugin from "webpack-error-notification"

// Although it's funny, this plugin is the only one which does not mess progressbar
// with other console output (like dev-server paths, created proxies, etc).
// @link https://github.com/alexkuz/nyan-progress-webpack-plugin/blob/master/index.js#L200-L208
import WebpackProgressbarPlugin from "nyan-progress-webpack-plugin"

export default [
  new webpack.DefinePlugin({
    __DEBUG__: env.dev(),
  }),

  // @link https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  new webpack.NoErrorsPlugin(),

  new webpack.optimize.CommonsChunkPlugin({
    name: settings.paths.bundles.vendor,
    minChunks: Infinity,
  }),

  ...env.dev.list([
    new WebpackErrorNotificationPlugin(),

    new WebpackProgressbarPlugin(),
  ]),

  ...env.prod.list([
    // Don't know how it actually implies on optimization,
    // but doc says it's recommended
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // @link https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // not interested in warnings about not optimal code from depth of vendor libs
      },
    }),
  ])
]
