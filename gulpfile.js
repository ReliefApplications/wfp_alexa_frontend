var gulp  = require('gulp');
var shell = require('gulp-shell');


gulp.task('default', shell.task([
    'echo',
    'echo COMMANDS LIST :',
    'echo - build  : Prepare the project to be pushed on the server',
    'echo - push  : Push the project on the server',
    'echo - deploy  : Build then push the project on the server',
    'echo'
]));

gulp.task('build', shell.task([
    'echo',
    'echo Building the project into ./build ...',
    'echo',
    'npm run-script build',
    'echo',
    'echo "FROM nginx:alpine\n COPY . /usr/share/nginx/html" >> build/Dockerfile',
    'echo',
    'echo Building finished',
    'echo'
]));

gulp.task('push', shell.task([
    'echo',
    'echo Deploying the project on the server ...',
    'echo',
    'scp -r build/* tester@217.70.189.97:/var/www/html/wfp-alexa2/',
    'echo',
    'echo Push finished',
    'echo',
]));

gulp.task('deploy', ['build'], function() {
    gulp.run('push');
    shell.task([
        'echo',
        'echo Deployment finished',
        'echo',
    ]);
});
