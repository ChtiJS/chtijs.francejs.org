var VarStream = require('varstream');

module.exports = function(grunt, env) {

	var defaults = config = {

		//chargement du package.json dans la config
		pkg : grunt.file.readJSON('package.json'),

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


	//chargement des options globales (filepaths)
	var stream = new VarStream(config, 'conf');
	stream.write(grunt.file.read(__dirname+'/../config.dat'));
  stream.end();
	
	return config;
}

