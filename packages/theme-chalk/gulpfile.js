import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import path from "path";
import { series, src, dest } from "gulp";
function compile() {
    const sass = gulpSass(dartSass);
    return src(path.resolve(__dirname, "./src/*.scss"))
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(dest("./dist"));
}
function copyfont() {
    return src(path.resolve(__dirname, './src/fonts/**')).pipe(cleanCss()).pipe(dest("./dist/fonts"));
}
function copyfullstyle() {
    const rootDistPath = path.resolve(__dirname, '../../dist/theme-chalk');
    return src(path.resolve(__dirname, './dist/*')).pipe(dest(rootDistPath));
}
export default series(compile, copyfullstyle);
