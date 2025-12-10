const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/edit-field-group.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/custom-field.scss`, `${dist}/css`)
    .js(`${source}/resources/js/edit-field-group.js`, `${dist}/js`)
    .js(`${source}/resources/js/use-custom-fields.js`, `${dist}/js`)
    .js(`${source}/resources/js/import-field-group.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/css/edit-field-group.css`, `${source}/public/css/edit-field-group.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/custom-field.css`, `${source}/public/css/custom-field.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/edit-field-group.js`, `${source}/public/js/edit-field-group.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/use-custom-fields.js`, `${source}/public/js/use-custom-fields.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/import-field-group.js`, `${source}/public/js/import-field-group.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
