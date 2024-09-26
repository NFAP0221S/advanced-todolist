// apps/todo-angular/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // Angular용 Webpack 설정
  entry: "./src/main.ts",
  mode: "development",
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todoAngular",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/app/app.component.ts",
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"],
    }),
  ],
};
