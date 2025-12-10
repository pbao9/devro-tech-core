const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/gallery.scss`, dist + '/css')
    .sass(`${source}/resources/sass/object-gallery.scss`, dist + '/css')
    .sass(`${source}/resources/sass/admin-gallery.scss`, dist + '/css')
    .js(`${source}/resources/js/gallery.js`, dist + '/js/gallery.js')
    .js(`${source}/resources/js/gallery-admin.js`, `${dist}/js/gallery-admin.js`)
    .js(`${source}/resources/js/object-gallery.js`, `${dist}/js/object-gallery.js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/gallery.js`, `${source}/public/js/gallery.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/gallery-admin.js`, `${source}/public/js/gallery-admin.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/object-gallery.js`, `${source}/public/js/object-gallery.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/gallery.css`, `${source}/public/css/gallery.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/admin-gallery.css`, `${source}/public/css/admin-gallery.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/object-gallery.css`, `${source}/public/css/object-gallery.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
