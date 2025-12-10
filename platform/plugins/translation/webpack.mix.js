const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .js(`${source}/resources/js/translation.js`, `${dist}/js`)
    .js(`${source}/resources/js/locales.js`, `${dist}/js`)
    .sass(`${source}/resources/sass/translation.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/translation.js`, `${source}/public/js/translation.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/locales.js`, `${source}/public/js/locales.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/translation.css`, `${source}/public/css/translation.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
