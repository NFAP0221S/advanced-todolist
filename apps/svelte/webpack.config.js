// apps/todo-svelte/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // Svelte용 Webpack 설정
  entry: "./src/main.js",
  mode: "development",
  devServer: {
    port: 3003,
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todoSvelte",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/App.svelte",
      },
    }),
  ],
};
