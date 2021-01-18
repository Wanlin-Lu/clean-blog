const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	entry: {
		app: path.join(__dirname,'src','index.js')
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
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname,'dist')
	}
}