import LOADERS from "./loaders"
import PLUGINS from "./plugins"

import fs from "fs"
import webpack from "webpack"
import settings from "../settings"
import { merge, env } from "../utils"

import enhance from "../enhancers"
import _ from "lodash"

// ------------------

export default enhance.lint({
  debug: env.dev(),

  context: settings.paths.src,

  resolve: {
    root: [
      // Any 3-party modules which we can't just install from remote sources for whatever reason.
      // Should take precedence over project own files.
      settings.paths.vendor,

      settings.paths.src,
    ],

    alias: {
      "_": "lodash",
      "cookie": "tiny-cookie",
    },
  },

  entry: {
    [settings.paths.bundles.vendor]: (
      // basically include everything declared in dependencies:
      _.chain(Object.keys(JSON.parse(fs.readFileSync("package.json")).dependencies))
        // but exclude huge modular libs, which we never need in their full size:
        .without(...[
          "lodash"
        ])
        // add only desired parts of modular libs:
        .concat([
          "lodash/fp/convert", // common module for all fp-based lodash functions
        ])
        .value()
    )
  },

  output: {
    filename: "[name]",

    // For dev mode prepend hostname to public path.
    // This is needed only and only to make work images in css.
    // Because img urls in css files are relative to containing file -
    // while in dev mode, with HMR enabled, we work not with files but with blobs,
    // so relative paths can't be resolved.
    // Full url has no such problem.
    //publicPath: `${!settings.env.HMR_CSS ? "" : settings.env.hosts.dev}${settings.web.assets}`,

    // @link https://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: settings.web.static,
  },

  module: {
    noParse: [
      /moment\/moment\.js$/,
    ],

    loaders: LOADERS,
  },

  plugins: PLUGINS,
})
