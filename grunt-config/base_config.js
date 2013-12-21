module.exports = function(grunt, env) {

	var defaults = config = {

		//chargement du package.json dans la config
		pkg : grunt.file.readJSON('package.json'),

		//chargement des options globales (filepaths)
		conf: grunt.file.readYAML('global_options.yaml'),

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