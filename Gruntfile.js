module.exports = function (grunt) {
	//const

	//requires

	//Callbacks

	// config
	grunt.initConfig({

		bower: {
			install: {
				options: {
					targetDir: './js/lib',
					layout: 'byType',
					install: true,
					verbose: true,
					cleanTargetDir: true,
					cleanBowerDir: true
				}
			}
		},

		connect: {
			options: {
				port: 9011,
				hostname: 'localhost'
			},
			reload: {
				options: {
					livereload: true
				}
			}
		},

		open: {
			index: {
				path: 'http://localhost:9011/'
			}
		},

		watch: {
			reload: {
				files: [
					'index.html',
					'./**/*.html',
					'./js/**/*.js',
					'./modules/**/*.js',
					'./css/**/*.css',
					'./img/**/*.{png,jpg,jpeg,gif,svg}'
				],
				options: {
					livereload: true
				}
			}
		}
	});

	// load
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');

	// register
	grunt.registerTask('prepare', ['bower:install']);
	grunt.registerTask('server', ['connect:reload', 'open:index', 'watch:reload']);
};