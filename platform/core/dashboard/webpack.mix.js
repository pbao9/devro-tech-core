const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/core/${directory}`
const dist = `public/vendor/core/core/${directory}`

mix
    .js(`${source}/resources/js/dashboard.js`, `${dist}/js`)
    .js(`${source}/resources/js/check-for-updates.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/dashboard.js`, `${source}/public/js/dashboard.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/check-for-updates.js`, `${source}/public/js/check-for-updates.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
