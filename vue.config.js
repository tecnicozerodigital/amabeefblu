/* eslint-disable */
const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
    transpileDependencies: true,
    filenameHashing: true,
    productionSourceMap: false,

    css: {
        extract: {
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }
    },

    configureWebpack: (config) => {
        if (isProd) {
            // nomi file stabili per long-term caching
            config.output = {
                ...config.output,
                filename: 'js/[name].[contenthash:8].js',
                chunkFilename: 'js/[name].[contenthash:8].js'
            }

            // compressioni (gzip + brotli)
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg|json|txt)$/i,
                    threshold: 8 * 1024,
                    minRatio: 0.8
                }),
                new BrotliPlugin({
                    asset: '[path].br[query]',
                    test: /\.(js|css|html|svg|json|txt)$/i,
                    threshold: 8 * 1024,
                    minRatio: 0.8
                })
            )

            // PRERENDER SEO
            if (process.env.RENDER === 'true') {
                config.plugins.push(
                    new PrerenderSPAPlugin({
                        staticDir: path.resolve(__dirname, 'dist'),
                        routes: ['/'],
                        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
                            headless: 'new',
                            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                            args: [
                                '--no-sandbox',
                                '--disable-setuid-sandbox',
                                '--disable-dev-shm-usage',
                                '--disable-gpu',
                                '--no-first-run',
                                '--no-default-browser-check'
                            ],
                            renderAfterDocumentEvent: 'app-rendered',
                            maxConcurrentRoutes: 1,
                            navigationOptions: {
                                waitUntil: 'networkidle0',
                                timeout: 120000
                            },
                            injectProperty: '__PRERENDER_INJECTED',
                            inject: { prerender: true },
                            skipThirdPartyRequests: true
                        })
                    })
                )
            }
        }

        if (process.env.ANALYZE === 'true') {
            config.plugins.push(new BundleAnalyzerPlugin())
        }
    },

    chainWebpack: (config) => {
        // gestiamo prefetch/preload a mano per rotta
        config.plugins.delete('prefetch')
        // config.plugins.delete('preload') // opzionale

        // split + runtime separato
        config.optimization
            .runtimeChunk('single')
            .splitChunks({
                chunks: 'all',
                maxInitialRequests: 10,
                maxAsyncRequests: 30,
                minSize: 20 * 1024,
                cacheGroups: {
                    vueCore: {
                        test: /[\\/]node_modules[\\/](vue|@vue|vue-router|pinia)[\\/]/,
                        name: 'chunk-vue-core',
                        priority: 40,
                        chunks: 'all'
                    },
                    gsap: {
                        test: /[\\/]node_modules[\\/]gsap[\\/]/,
                        name: 'chunk-gsap',
                        priority: 35,
                        chunks: 'all'
                    },
                    swiper: {
                        test: /[\\/]node_modules[\\/]swiper[\\/]/,
                        name: 'chunk-swiper',
                        priority: 33,
                        chunks: 'all'
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'chunk-vendors',
                        priority: 20,
                        reuseExistingChunk: true,
                        chunks: 'all'
                    },
                    common: {
                        name: 'chunk-common',
                        minChunks: 2,
                        priority: 10,
                        reuseExistingChunk: true,
                        chunks: 'all'
                    }
                }
            })

        // id/hash stabili
        config.optimization.set('moduleIds', 'deterministic')
        config.optimization.set('chunkIds', 'deterministic')

        // pulizia prod (rimuove console e debugger)
        if (config.get('mode') === 'production') {
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.compress.drop_console = true
                args[0].terserOptions.compress.drop_debugger = true
                return args
            })
        }
    },

    // ⚙️ CONFIGURAZIONE PWA (Workbox)
    pwa: {
        name: 'AmaBeef',
        themeColor: '#EBCCB3',
        msTileColor: '#EBCCB3',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#EBCCB3',

        // Senza questo blocco il plugin usa i suoi iconPaths di default, che
        // puntano a due file inesistenti: /img/icons/favicon.svg e
        // safari-pinned-tab.svg. Il primo non c'e' proprio (la SPA rispondeva
        // 200 servendo l'index.html al posto dell'icona), il secondo conteneva
        // ancora il logo Vue dello scaffold. Erano dichiarati nell'HTML, ed e'
        // il motivo per cui Google mostrava la V di Vue nei risultati.
        // Dichiarare null rimuove il <link> invece di puntare a un file rotto.
        iconPaths: {
            faviconSVG: null,
            maskIcon: null,
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
            msTileImage: 'img/icons/msapplication-icon-144x144.png'
        },
        workboxOptions: {
            navigateFallback: '/index.html',
            skipWaiting: true,   // il nuovo SW sostituisce subito il vecchio
            clientsClaim: true,  // prende controllo di tutte le tab aperte
            cleanupOutdatedCaches: true,

            // 🚫 Escludi questi file dal precache
            exclude: [
                /sw\.js$/,
                /manifest\.json$/,
                /robots\.txt$/,
                /sitemap\.xml$/,
                /index\.html$/,
                /\.pdf$/i
            ],

            // Cache API e immagini (runtime)
            runtimeCaching: [
                {
                    urlPattern: /\/v1\//,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        networkTimeoutSeconds: 5,
                        expiration: { maxEntries: 50, maxAgeSeconds: 300 }
                    }
                },
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'image-cache',
                        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
                    }
                }
            ]
        }
    }
})