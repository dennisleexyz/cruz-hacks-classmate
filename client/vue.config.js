// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // publicPath: ''
  devServer: {
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     new CopyWebpackPlugin([
  //       {
  //         from: 'src/assets/local-image/',
  //         to: 'local-image'
  //       }
  //     ])
  //   ]
  // }
  chainWebpack: config => {
    ['scss', 'css'].forEach(rule => {
      ['normal', 'normal-modules', 'vue', 'vue-modules'].forEach(oneOf => {
        config.module
          .rule(rule)
            .oneOf(oneOf)
              .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                  resources: './src/global.scss'
                })
      })
    })
  }
}
