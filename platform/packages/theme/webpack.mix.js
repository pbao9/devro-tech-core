const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/packages/${directory}`
const dist = `public/vendor/core/packages/${directory}`

mix
    .js(`${source}/resources/js/theme-options.js`, `${dist}/js`)
    .js(`${source}/resources/js/theme.js`, `${dist}/js`)
    .js(source + '/resources/js/icons-field.js', dist + '/js')
    .js(source + '/resources/js/toast.js', dist + '/js')
    .sass(`${source}/resources/sass/theme-options.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/admin-bar.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/guideline.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/theme-options.js`, `${source}/public/js/theme-options.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/theme.js`, `${source}/public/js/theme.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(dist + '/js/icons-field.js', source + '/public/js/icons-field.js')
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(dist + '/js/toast.js', source + '/public/js/toast.js')
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/theme-options.css`, `${source}/public/css/theme-options.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/admin-bar.css`, `${source}/public/css/admin-bar.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/guideline.css`, `${source}/public/css/guideline.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
