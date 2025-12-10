const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/packages/${directory}`
const dist = `public/vendor/core/packages/${directory}`

mix
    .js(`${source}/resources/js/plugin.js`, `${dist}/js`)
    .js(`${source}/resources/js/marketplace.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/js/plugin.js`, `${source}/public/js/plugin.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/marketplace.js`, `${source}/public/js/marketplace.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
