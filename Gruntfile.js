module.exports = function(grunt) {

    // Load the tasks automatically w/ load-grunt-tasks
    require("load-grunt-tasks")(grunt);


    // Grunt config 
    grunt.initConfig({

        // JsHint task
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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
        
        concat: {
            options: {
                separator: ';',
            },
            app: {
                files: {
                    'dist/app.js': ['src/**/*.js']
                }
            },
            libs: {
                files: {
                    'dist/libs.js': [
                        'libs/angular/angular.min.js',
                        'libs/angular-animate/angular-animate.min.js',
                        'libs/angular-route/anglar-route.min.js',
                        'libs/angular-sanitize/angular-sanitize.min.js'
                    ]
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
                    'dist/app.js': 'dist/app.js'
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
    grunt.registerTask('build-dev', ['compass', 'concat', 'babel']);
    grunt.registerTask('build-prod', ['compass', 'babel', 'uglify']);

};