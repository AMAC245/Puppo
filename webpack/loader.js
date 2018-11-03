const scss = {
  fileRegexp: /\.scss$/,
  loaderName: 'sass-loader'
}

const less = {
  fileRegexp: /\.less$/,
  loaderName: 'less-loader'
}

const stylus = {
  fileRegexp: /\.styl$/,
  loaderName: 'stylus-loader'
}

const preprocessor = scss;

module.exports = {
  preprocessor
}