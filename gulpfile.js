var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    var tsResult = gulp.src('src/ts-framework/*.ts')
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('src/ts-framework-build')),
        tsResult.js.pipe(gulp.dest('src/ts-framework-build'))
    ]);
});

// gulp.task('test', ['default'], function () {
//     var tsResult = gulp.src('src/ts-framework-test/*.ts')
//         .pipe(ts(tsProject));
//
//     return merge([
//         tsResult.dts.pipe(gulp.dest('src/ts-framework-test')),
//         tsResult.js.pipe(gulp.dest('src/ts-framework-test'))
//     ]);
// });

gulp.task('watch', ['default'], function() {
    gulp.watch('src/ts-framework/*.ts', ['default']);
});
