const path = require('path')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

// Config
const nextConfig = {
  distDir: 'build',
  devIndicators: {
    autoPrerender: false
  },
  swcMinify: true,

  // Webpack
  webpack(config) {
    // Root dir
    config.resolve.modules.push(path.resolve('./src'))

    // Return
    return config
  }
}

module.exports = withPlugins([withImages], nextConfig)
