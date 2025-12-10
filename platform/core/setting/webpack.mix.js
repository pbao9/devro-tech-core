const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/core/${directory}`
const dist = `public/vendor/core/core/${directory}`

mix
    .js(`${source}/resources/js/admin-email.js`, `${dist}/js`)
    .js(`${source}/resources/js/email.js`, `${dist}/js`)
    .js(`${source}/resources/js/email-template.js`, `${dist}/js`)
    .js(`${source}/resources/js/media.js`, `${dist}/js`)
    .js(`${source}/resources/js/license-component.js`, `${dist}/js`)
    .sass(`${source}/resources/sass/admin-email.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/admin-email.js`, `${source}/public/js/admin-email.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/email.js`, `${source}/public/js/email.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/email-template.js`, `${source}/public/js/email-template.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/media.js`, `${source}/public/js/media.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/license-component.js`, `${source}/public/js/license-component.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/admin-email.css`, `${source}/public/css/admin-email.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
