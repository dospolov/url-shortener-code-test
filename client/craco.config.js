const CracoAntDesignPlugin = require("craco-antd");
const webpack = require("webpack")

module.exports = {
  plugins: [{ plugin: CracoAntDesignPlugin }],
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
      })
    ]
  }
};