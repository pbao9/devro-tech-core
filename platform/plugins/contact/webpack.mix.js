const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/contact.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/contact-public.scss`, `${dist}/css`)
    .js(`${source}/resources/js/contact.js`, `${dist}/js`)
    .js(`${source}/resources/js/custom-field.js`, `${dist}/js`)
    .js(`${source}/resources/js/contact-public.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/css/contact.css`, `${source}/public/css/contact.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/contact-public.css`, `${source}/public/css/contact-public.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/contact.js`, `${source}/public/js/contact.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/custom-field.js`, `${source}/public/js/custom-field.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/contact-public.js`, `${source}/public/js/contact-public.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
