module.exports = function(grunt) {
    grunt.registerTask('liveServer', [
        'express:dev',
        'watch'
    ]);
};
