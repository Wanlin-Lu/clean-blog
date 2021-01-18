const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
	devtool: 'source-map',
	module: {
		rules: [
			{
        test: /\.(scss|sass|css)$/,
        use: [
	        {
	        	loader: MiniCssExtractPlugin.loader,
	        	options: {
	        		publicPath: '/'
	        	}
	        },
	        'css-loader',
	        'sass-loader',
        ]
      },
      {
      	test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
      	use: [
      		{
      			loader: 'file-loader',
      			options: {
      				outputPath: 'images',
      				name: '[name].[hash].[ext]',
      			}
      		},
      		{
      			loader: 'image-webpack-loader',
      			options: {
      				mozjpeg: {
      					progressive: true,
      					quality: 65,
      				},
      				svgo: {
      					plugins: [
      						{
      							removeViewBox: false,
      						},
      						{
      							removeEmptyAttrs: false,
      						}
      					]
      				},
      				gifsicle: {
      					interlaced: false,
      				},
      				optipng: {
      					optimizationLevel: 7,
      				},
      				pngquant: {
      					quality: [0.65, 0.90],
      					speed: 4,
      				},
      				webp: {
      					quality: 75
      				}
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
      				name: '[name].[hash].[ext]',
      			}
      		}
      	]
      }
		]
	},
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
        }
      }
    }
  },
	plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
})