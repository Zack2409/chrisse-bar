// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
//   transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)']
// }

const { createModelDirective } = require('vue-wc-model');
 
module.exports = {
    // ...
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options.compilerOptions = options.compilerOptions || {};
                options.compilerOptions.directives = {
                    ...options.compilerOptions.directives,
                    wmodel: createModelDirective(),
                };
 
                return options;
            });
    },
}
