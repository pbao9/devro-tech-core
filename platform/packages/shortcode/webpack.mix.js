const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = 'platform/packages/' + directory
const dist = 'public/vendor/core/packages/' + directory

mix
    .js(`${source}/resources/js/shortcode-fields.js`, `${dist}/js`)
    .js(`${source}/resources/js/shortcode.js`, `${dist}/js`)
    .sass(`${source}/resources/sass/shortcode.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/shortcode-fields.js`, `${source}/public/js/shortcode-fields.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/shortcode.js`, `${source}/public/js/shortcode.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/shortcode.css`, `${source}/public/css/shortcode.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
