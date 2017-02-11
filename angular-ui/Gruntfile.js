module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      app: {
        src: ['app/**/*.js'],
        dest: 'dist/app.js'
      },
      vendor: {
        src: [
          'node_modules/angular/angular.js',
          'node_modules/angular-route/angular-route.js'
        ],
        dest: 'dist/vendor.js'
      }
    },
    less: {
      development: {
        files: {
          'dist/app.css': 'app/**/*.less'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**/*.html'], dest: 'dist'}
        ]
      }
    },
    watch: {
      files: ['app/**/*'],
      tasks: ['concat', 'less', 'copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'concat', 'less', 'watch']);

};