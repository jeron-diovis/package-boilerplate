import { merge } from "../utils"
import mapValues from "lodash/mapValues"

import lint from "./lint"

export default mapValues(
  {
    lint
  },
  cfg => base => merge(base, cfg)
)