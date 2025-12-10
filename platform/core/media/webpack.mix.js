const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/core/${directory}`
const dist = `public/vendor/core/core/${directory}`

mix
    .sass(`${source}/resources/sass/media.scss`, `${dist}/css`)
    .js(`${source}/resources/js/media.js`, `${dist}/js`)
    .js(`${source}/resources/js/integrate.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/media.js`, `${source}/public/js/media.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/integrate.js`, `${source}/public/js/integrate.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/media.css`, `${source}/public/css/media.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
