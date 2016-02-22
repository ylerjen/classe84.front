module.exports = function(grunt) {

    // Load the tasks automatically w/ load-grunt-tasks
    require("load-grunt-tasks")(grunt);


    // Grunt config 
    grunt.initConfig({

        // JsHint task
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        // Compass compilation
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'dist/css'
                }
            }
        },
        
        // Babel task
        babel: {            
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/app.js': 'app/**/*.js'
                }
            }
        },
        
        // Uglify
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            js: {
                files: {
                    'dist/js/libs.min.js': ['temp/js/libs.js'],
                    'dist/js/app.min.js' : ['temp/js/app.js']
                }
            }
        },

        //Karma testing task
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },

        // Watch task
        watch: {
            compass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass']
            },
            jshint: {
                    files: ['app/**/*.ts', 'app/**/*.js'],
                    tasks: ['jshint']
            },
            babel: {
                files: 'app/**/*.js',
                tasks: ['concat', 'babel']
            },
            karma: {
                files: ['app/js/**/*.js', 'test/**/*.js'],
                tasks: ['compass', 'babel', 'karma:unit:run'] //NOTE the :run flag
            }
        }
    });


    // Grunt tasks
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['compass', 'babel', 'karma:unit:run']);
    grunt.registerTask('build-dev', ['compass', 'babel']);
    grunt.registerTask('build-prod', ['compass', 'babel', 'uglify']);

};