module.exports = function(grunt, env) {

	var defaults = config = {

		// linting js avec reporter ameliore
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			//vérification du gruntfile
			gruntfile: {
				src: ['Gruntfile.js']
			}
		}
	};
	
	return config;
}