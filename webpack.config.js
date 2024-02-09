const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const INCLUDE_PATTERN = /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi
const processNestedHtml = (content, loaderContext, dir = null) =>
  !INCLUDE_PATTERN.test(content)
    ? content
    : content.replace(INCLUDE_PATTERN, (m, src) => {
      const filePath = path.resolve(dir || loaderContext.context, src)
      loaderContext.dependency(filePath)
      return processNestedHtml(
        loaderContext.fs.readFileSync(filePath, 'utf8'),
        loaderContext,
        path.dirname(filePath)
      )
    })

const paths = []
const generateHTMLPlugins = () =>
  glob.sync('./src/*.html').map((dir) => {
    const filename = path.basename(dir)

    if (filename !== '404.html') {
      paths.push(filename)
    }

    return new HtmlWebpackPlugin({
      filename,
      template: `./src/${filename}`,
      favicon: `./src/images/logo/icon.png`,
      inject: 'body',
    })
  })

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public/build'),
    },
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost/12TKJ',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                'prismjs',
                {
                  languages: ['javascript', 'css', 'markup'],
                  plugins: ['copy-to-clipboard'],
                  css: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 2 versions'],
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          preprocessor: processNestedHtml,
        },
      },
    ],
  },
  plugins: [
    ...generateHTMLPlugins(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/build'),
    clean: true,
    assetModuleFilename: '[path][name][ext]',
  },
  target: 'web', 
  stats: 'errors-only', 
}