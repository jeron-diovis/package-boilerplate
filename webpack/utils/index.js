import settings from "../settings"
import multiMerge from "deep-merge/multiple"
import querystring from "qs"

const _merge = multiMerge((target, source) =>
  (target instanceof Array || source instanceof Array)
    ? [].concat(target, source)
    : source)

export const merge = (...args) => _merge(args)

// some loaders requires arrays to be passed exactly in format "a[]=1&a[]=2"
export const qs = (str, query) => !query ? str : `${str}?${querystring.stringify(query, { arrayFormat: "brackets" })}`

// ------

export const cond = {
  map: (predicate, map) => predicate ? map : {},
  list: (predicate, list) => predicate ? list : []
}

const makeEnv = predicate => {
  const fn = val => !predicate ? false : (val === undefined ? true : val)
  Object.keys(cond).forEach(key => fn[key] = cond[key].bind(null, predicate))
  return fn
}

export const env = {
  dev:  makeEnv(!settings.env.prod),
  prod: makeEnv(settings.env.prod)
}