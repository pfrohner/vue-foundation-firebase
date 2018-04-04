const webpack = require('webpack');

module.exports = {
	lintOnSave : true,
	devServer: {
		quiet : false,
		stats : {
			modules : false,
			errors : true,
			colors : true
		}
	},
	configureWebpack : {
		plugins : [
			new webpack.ProvidePlugin({
				$ : 'jquery',
				jQuery : 'jquery',
				'window.jQuery' : 'jquery'
			})
		]
	},
	chainWebpack : config => {
		config.plugins.delete('friendly-errors');

		// foundation relies on certain classnames, cannot be obfuscated :-/
		if (process.env.NODE_ENV === 'production') {

			config
				.plugin('uglify')
				.init((Plugin) => new Plugin({
					uglifyOptions : {
						comments : false,
						mangle : {
							keep_classnames : true
						}
					}
				}));
		}
	}
};
