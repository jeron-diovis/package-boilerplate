import settings from "../settings"
import { merge } from "../utils"

export default {
  module: {
    preLoaders: [
      {
        test: /\.js$/i,
        include: [
          settings.paths.root.src,
        ],
        loader: "eslint",
      }
    ]
  },

  eslint: {
    failOnError: true,
    failOnWarning: false,
  },
}
