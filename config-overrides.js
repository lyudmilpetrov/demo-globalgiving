const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // enable legacy decorators babel plugin
  // addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    ["app-entry$"]: path.resolve(__dirname, "src/index.js"),
    ["app-main$"]: path.resolve(__dirname, "src/containers/App/index.js"),
    ["app-router$"]: path.resolve(__dirname, "src/containers/App/router.js"),
    ["app-get-theme$"]: path.resolve(
      __dirname,
      "src/utility/themesFunctions.js"
    ),
    ["app-state$"]: path.resolve(__dirname, "src/containers/App/state.js"),
    ["app-apis$"]: path.resolve(__dirname, "src/api/APIsServices.js"),
    ["app-loader$"]: path.resolve(__dirname, "src/components/loader/index.js"),
    ["app-loader-indicator$"]: path.resolve(
      __dirname,
      "src/components/loding-indicator/index.js"
    ),
    ["app-home$"]: path.resolve(__dirname, "src/containers/HomePage/index.js"),
    ["app-bar$"]: path.resolve(__dirname, "src/components/app-bar/app-bar.js"),
    ["app-table$"]: path.resolve(__dirname, "src/components/table/index.js"),
    ["app-helpers$"]: path.resolve(__dirname, "src/utility/helpers.js"),
  }),

  // adjust the underlying workbox
  adjustWorkbox((wb) =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html"),
    })
  )
);
