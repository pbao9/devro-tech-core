const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/core/${directory}`
const dist = `public/vendor/core/core/${directory}`

mix
    .vue()
    .sass(`${source}/resources/sass/core.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/libraries/select2/select2.scss`, `${dist}/css/libraries`)
    .sass(`${source}/resources/sass/components/email.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/components/error-pages.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/components/tree-category.scss`, `${dist}/css`)
    .sass(`${source}/resources/sass/components/crop-image.scss`, `${dist}/css`)
    // Temporarily disabled - need to run after SASS compilation
    // .postCss(`${dist}/css/core.css`, `${dist}/css/core.rtl.css`, [
    //     require('rtlcss')
    // ])
    // .postCss(`${dist}/css/libraries/select2.css`, `${dist}/css/libraries/select2.rtl.css`, [
    //     require('rtlcss')
    // ])
    .js(`${source}/resources/js/core-ui.js`, `${dist}/js`)
    .js(`${source}/resources/js/app.js`, `${dist}/js`)
    .js(`${source}/resources/js/core.js`, `${dist}/js`)
    .js(`${source}/resources/js/editor.js`, `${dist}/js`)
    .js(`${source}/resources/js/global-search.js`, `${dist}/js`)
    .js(`${source}/resources/js/license-activation.js`, `${dist}/js`)
    .js(`${source}/resources/js/cache.js`, `${dist}/js`)
    .js(`${source}/resources/js/tags.js`, `${dist}/js`)
    .js(`${source}/resources/js/form/phone-number-field.js`, `${dist}/js`)
    .js(`${source}/resources/js/system-info.js`, `${dist}/js`)
    .js(`${source}/resources/js/tree-category.js`, `${dist}/js`)
    .js(`${source}/resources/js/cleanup.js`, `${dist}/js`)
    .js(`${source}/resources/js/notification.js`, `${dist}/js`)
    .js(`${source}/resources/js/vue-app.js`, `${dist}/js`)
    .js(`${source}/resources/js/repeater-field.js`, `${dist}/js`)
    .js(`${source}/resources/js/system-update.js`, `${dist}/js`)
    .js(`${source}/resources/js/crop-image.js`, `${dist}/js`)
    .copy('node_modules/jquery/dist/jquery.min.js', `${dist}/libraries/jquery.min.js`)
    .copy(
        mix.inProduction() ? './node_modules/vue/dist/vue.global.prod.js' : './node_modules/vue/dist/vue.global.js',
        `${dist}/libraries/vue.global.min.js`
    )

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap('CopyFilesPlugin', (compilation) => {
                        const fs = require('fs-extra')
                        try {
                            fs.copySync(`${dist}/css/core.css`, `${source}/public/css/core.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/libraries/select2.css`, `${source}/public/css/libraries/select2.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/email.css`, `${source}/public/css/email.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/error-pages.css`, `${source}/public/css/error-pages.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/tree-category.css`, `${source}/public/css/tree-category.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/crop-image.css`, `${source}/public/css/crop-image.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/core.rtl.css`, `${source}/public/css/core.rtl.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/css/libraries/select2.rtl.css`, `${source}/public/css/libraries/select2.rtl.css`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/core-ui.js`, `${source}/public/js/core-ui.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/app.js`, `${source}/public/js/app.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/core.js`, `${source}/public/js/core.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/vue-app.js`, `${source}/public/js/vue-app.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/editor.js`, `${source}/public/js/editor.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/global-search.js`, `${source}/public/js/global-search.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/license-activation.js`, `${source}/public/js/license-activation.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/cache.js`, `${source}/public/js/cache.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/tags.js`, `${source}/public/js/tags.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/phone-number-field.js`, `${source}/public/js/phone-number-field.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/system-info.js`, `${source}/public/js/system-info.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/repeater-field.js`, `${source}/public/js/repeater-field.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/tree-category.js`, `${source}/public/js/tree-category.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/cleanup.js`, `${source}/public/js/cleanup.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/system-update.js`, `${source}/public/js/system-update.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/crop-image.js`, `${source}/public/js/crop-image.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/js/notification.js`, `${source}/public/js/notification.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/libraries/jquery.min.js`, `${source}/public/libraries/jquery.min.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                        try {
                            fs.copySync(`${dist}/libraries/vue.global.min.js`, `${source}/public/libraries/vue.global.min.js`)
                        } catch (err) {
                            console.warn('Copy failed:', err.message)
                        }
                    })
                }
            }
        ]
    })
}
