<template>
    <div class="stickySweet">
        <div
        class="fill"
        ref="fill" />

        <div
        class="sticky"
        ref="sticky">
            <div
            class="atTop"
            ref="atTop" />

            <div
            class="atBottom"
            ref="atBottom" />

            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'sticky_sweet',
    props: {
        containerClass: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            atTop: false,
            atBottom: null,
            dir: null,
            lst: 0,
            observer: null,
            container: null
        }
    },
    watch: {
        dir (a, b) {
            if (a && a !== b) {
                this.calc(a)
            }
        }
    },
    mounted () {
      this.$nextTick(this.start)
    },
    methods: {
        start () {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (e.target.classList.contains('atTop')) {
                        this.atTop = e.intersectionRatio >= 1
                    } else if (e.target.classList.contains('atBottom')) {
                        this.atBottom = e.intersectionRatio >= 1
                    }
                })
                },
                { threshold: [1] }
            )

            this.observer.observe(this.$refs.atTop)
            this.observer.observe(this.$refs.atBottom)
            this.container = this.$el.closest(`.${this.containerClass}`)
            this.container.addEventListener('scroll', this.onScroll)
        },
        onScroll (e) {
            if (e.target.scrollTop > this.lst) this.dir = 'down'
            else this.dir = 'up'
            this.lst = e.target.scrollTop
        },
        calc(dir) {
            const fill = this.$refs.fill
            const sticky = this.$refs.sticky
            const rSticky = sticky.getBoundingClientRect()
            const rContainer = this.container.getBoundingClientRect()
            const h = rContainer.height - rSticky.height

            if (h > 0) {
                return (sticky.style.top = 0)
            }

            if (dir === 'up') {
                sticky.style.top = null
                sticky.style.bottom = `${h}px`

                if (this.atBottom) {
                    fill.style.height = `${Math.max(0, this.lst + rContainer.height - rSticky.height)}px`
                }
            } else {
                sticky.style.bottom = null
                sticky.style.top = `${h}px`
                if (this.atTop) fill.style.height = `${this.lst}px`
            }
        }
    },
    beforeUnmount() {
        this.observer.disconnect()
        this.container.removeEventListener('scroll', this.onScroll)
    }
}
</script>

<style lang='scss' scoped>
.stickySweet {
    position: relative;

    .sticky {
        position: sticky;

        .atTop {
            position: absolute;
            top: 0;
            left: 0;
        }

        .atBottom {
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
}
</style>