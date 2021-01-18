const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'development',
	module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ['style-loader','css-loader','sass-loader',]
      },
      {
      	test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
      	use: [
      		{
      			loader: 'file-loader',
      			options: {
      				outputPath: 'images',
      				name: '[name].[ext]',
      			}
      		}
      	]
      },
      {
      	test: /\.(woff|woff2|eot|ttf|otf)$/,
      	use: [
      		{
      			loader: 'file-loader',
      			options: {
      				outputPath: 'fonts',
      				name: '[name].[ext]',
      			}
      		}
      	]
      }
    ]
  },
	devServer: {
		contentBase: path.join(__dirname,'dist'),
		inline: true,
		port: 9000
	}
})