import settings from "../settings"
import { env, qs } from "../utils"

export default [
  {
    test: /\.js$/i,
    include: [
      settings.paths.root.src,
    ],

    loaders: [
      // hot-loader adds a noticeable amount of code to each module.
      // When defined as plugin in .babelrc instead of loader, extra code becomes much less, but still noticeable.
      // Although it's only about 300-700 bytes per module,
      // production build definitely does not need it anyway
      ...env.dev.list([ "react-hot-loader/webpack" ]),

      "babel-loader",
    ],
  },

  {
    test: /\.json$/i,
    // don't include json from vendor libs unless it's really required
    include: [
      settings.paths.root.src,
    ],
    loader: "json",
  },

  {
    test: /\.(woff|ttf|eot|svg)/i,
    loader: "file"
  },

  {
    test: /\.(jpe?g|png|gif)$/i,
    loaders: [
      // It's quite strange, that single loader you can define as { loader: "...", query: { ... } },
      // but inside "loaders" array you CAN'T use that query syntax – only stringified form
      qs("url", {
        // Size threshold for converting img to data-uri
        limit: 10000, // kb
        // On dev keep src dirs structure - just for better understanding what img came from
        name: env.dev("[path][name].[ext]")
      }),

      qs("img", {
        minimize: env.prod(),
        progressive: true,
      })
    ]
  }
]
