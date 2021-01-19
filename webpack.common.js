const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
	entry: {
		app: path.join(__dirname,'src','/js/index.js')
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				options: {
					emitWarning: process.env.NODE_ENV !== 'production',
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname,'src'),
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		alias: {
			images: path.resolve(__dirname, 'src/res/images')
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new CleanWebpackPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname,'dist')
	}
}

const files = glob.sync('./src/html/*.html')
files.forEach((file) => {
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.basename(file),
      template: file,
      inject: true,
      favicon: path.resolve(__dirname,'./src/res/favicon.ico'),
      minify: process.env.NODE_ENV === 'production',
    })
  )
})

module.exports = config