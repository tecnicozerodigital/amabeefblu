<template>
    <div
    :key="key"
    :class="['view', classes]">
        <div
        v-if="loading"
        class="pa-24">
            <bxs-loader />
        </div>

        <div v-else>
            <!-- <bxs-hero v-bind="heroProps">
                <slot name="hero" />
            </bxs-hero> -->

            <slot v-bind="$attrs" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'bxs_view',
    props: {
        classes: [String, Array],
        api: {
            type: String,
            required: false,
            default: ''
        },
        'hero-props': {
            type: Object,
            required: false,
            default: () => {
                return {
                    ratio: '21-3'
                }
            }
        }
    },
    provide() {
        return {
            view: this
        }
    },
    emits: [
        'api-success',
        'api-error'
    ],
    data () {
        return {
            key: 0,
            loading: true,
            data_page: null
        }
    },
    head () {
        if (!this.data_page) return {}

        return {
            title: 'Swiss Start - ' + this.data_page.meta.title,
            meta: [
                { name: 'description', content: this.data_page.meta.description },
                { name: 'canonical', content: window.location.href },
                // og
                { name: 'og:type', content: 'website' },
                { name: 'og:site_name', content: 'Swiss Start' },
                { name: 'og:title', content: 'Swiss Start - ' + this.data_page.meta.title },
                { name: 'og:description', content: this.data_page.meta.description },
                { name: 'og:image', content: this.img ? this.img.url : '' },
                { name: 'og:image:width', content: '1080' },
                { name: 'og:image:height', content: '1080' },
                { name: 'og:url', content: window.location.href },
                // twc
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: 'Swiss Start - ' + this.data_page.meta.title },
                { name: 'twitter:description', content: this.data_page.meta.description },
                { name: 'twitter:image', content: this.img ? this.img.url : '' },
                // indexing
                { name: 'robots', content: this.data_page.meta.robots }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    content: `
                        {
                            "@context": "http://schema.org",
                            "@type": "WebSite",
                            "name": "Swiss Start",
                            "url": "https://coachfinder.it",
                            "sameAs": ["https://www.facebook.com/coachfinder"]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "url": "https://swissstart.ch",
                            "logo": "https://swissstart.ch/logo.jpg"
                        }
                    `
                }
            ]
        }
    },
    mounted () {
        this.$nextTick(() => this.start(this.$route.params.slug))
    },
    beforeRouteUpdate (to) {
        this.$store.commit('set_is_loading', true)
        this.start(to.params.slug)
    },
    methods: {
        async start (slug) {
            this.loading = true
            let url = `v1`

            if (this.api && slug.length > 0) url += this.api
            if (slug && slug.length > 0) url += `/${slug}`

            try {
                if (this.api || slug) {
                    this.data_page = await this.$api.get(url)
                }

                this.$emit('api-success', this.data_page)

                this.$store.commit('set_is_loading', false)
            } catch (err) {
                this.$router.push('/errors/404')
                this.$emit('api-error', err)
            } finally {
                this.loading = false
            }
        },
        scrollTo (id) {
            const element = document.getElementById(id)
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }
    }
}
</script>