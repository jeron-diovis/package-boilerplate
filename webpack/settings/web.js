import sysPath from "path"

const root = "/"

export default {
  root,
  static: sysPath.join(root, "/static/"),
  api: sysPath.join(root, "/api/"),
}
