const { resolve } = require('path');

module.exports = {
  proxy: {
    '/api': {
      target: 'http://v.juhe.cn',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  },
  alias: {
    '/@/': resolve(__dirname, './src')
  }
}

