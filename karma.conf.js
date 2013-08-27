// Karma configuration
// Generated on Sun Aug 18 2013 13:28:40 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],

      // list of files / patterns to load in the browser
      files: [
          'public/js/lib/angular/angular.js',
          'public/js/lib/angular/angular-*.js',
          'public/js/lib/jquery/jquery-1.8.2.js',
          'public/js/lib/jquery/jquery-ui-1.9.1.custom.js',

          'public/js/controllers.js',
          'public/js/itemCtrl.js',
          'public/js/relationshipCtrl.js',
          'public/js/viewCtrl.js',
          'public/js/services/services.js',
          'public/js/services/constants.js',
          'public/js/services/throttle.js',
          'public/js/services/*.js',
          'public/js/directives/directives.js',
          'public/js/app.js',
          //'public/js/**/*.js',
          //'public/js/lib/jasmine*/*.js',
          'test/client/*.js'
      ],


    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome', 'Firefox'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
