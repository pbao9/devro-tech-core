const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/dashboard/style.scss`, `${dist}/css/dashboard`)
    .sass(`${source}/resources/sass/dashboard/style-rtl.scss`, `${dist}/css/dashboard`)
    .js(`${source}/resources/js/member-admin.js`, `${dist}/js`)
    .js(`${source}/resources/js/dashboard/script.js`, `${dist}/js/dashboard`)
    .js(`${source}/resources/js/dashboard/activity-logs.js`, `${dist}/js/dashboard`)
    .sass(`${source}/resources/sass/front-auth.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/css/dashboard/style.css`, `${source}/public/css/dashboard/style.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/dashboard/style-rtl.css`, `${source}/public/css/dashboard/style-rtl.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/member-admin.js`, `${source}/public/js/member-admin.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/dashboard/script.js`, `${source}/public/js/dashboard/script.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/dashboard/activity-logs.js`, `${source}/public/js/dashboard/activity-logs.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/front-auth.css`, `${source}/public/css/front-auth.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
