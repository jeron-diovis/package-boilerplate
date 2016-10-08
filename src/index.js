import some_func from "./some_module"

export default "it works"

// eslint-disable-next-line no-console
console.log("call some_func:", some_func())

/* global module:false */
// @link https://webpack.github.io/docs/hot-module-replacement.html#how-to-deal-with
// App entry point can safely accept any changes:
if (module.hot) { module.hot.accept() }
// This is simplified versions of what react-hot-loader does with modules. It's how HMR actually works.
