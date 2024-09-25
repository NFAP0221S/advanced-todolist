// apps/todo-react/webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // Webpack 기본 설정
  entry: "./src/index",
  mode: "development",
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todoReact",
      filename: "remoteEntry.js",
      exposes: {
        "./TodoApp": "./src/App", // React 앱의 메인 컴포넌트 노출
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};
