import path from "path"

// Use process.cwd() instead of __dirname,
// because __dirname can be relative, and then everything resolves wrong.
// It's supposed that webpack is ran from root folder,
// so process.cwd() always points to it.
const root = process.cwd()

const dir = subpath => path.join(root, subpath)

// --------

export default {
  app: root,
  src: dir("src"),
  vendor: dir("vendor"),
  assets: dir("assets"),
  dist: {
    client: dir("dist"),
  },

  bundles: {
    client: "app.js",
    vendor: "vendor.js",
    styles: "styles.css",
  },
}
