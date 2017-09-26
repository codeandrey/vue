import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
 
const port  = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use('/dist', express.static('dist'))

import webpack from 'webpack'
import webpackMiddlware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev.js'

if (process.env.NODE_ENV === 'development'){
	const compiler = webpack(webpackConfig)
	app.use(webpackMiddlware(compiler,{
		hot: true,
		publicPath: webpackConfig.output.publicPath,
		noinfo: true

	}))
	app.use(webpackHotMiddleware(compiler))
}
app.get('/*', (req, res) =>{
	res.sendFile(path.join(__dirname, '../index.html'))
})
app.listen(port, () => console.log('Server listen on port = ', port, 'ENV = ', process.env.NODE_ENV) )