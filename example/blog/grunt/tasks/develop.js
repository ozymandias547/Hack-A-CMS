module.exports = function(grunt) {
	grunt.registerTask('develop', [
		'clean:dev',
        'webpack-dev-server'
    ]);
};
