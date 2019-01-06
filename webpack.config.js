module.exports = {
  entry: './src/index.tsx',
  mode: "production",
  output: {
    filename: "bundle.min.js",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }

};