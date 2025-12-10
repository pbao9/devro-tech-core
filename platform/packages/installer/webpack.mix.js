const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/packages/${directory}`
const dist = `public/vendor/core/packages/${directory}`

mix.sass(`${source}/resources/sass/style.scss`, `${dist}/css`)

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/css/style.css`, `${source}/public/css/style.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
