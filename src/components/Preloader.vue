<template>
    <div class="preloader">
        <bxs-layout class="text-center">
            <slot />

            <div
            ref="progress"
            class="preloader--progress mt-6">
                <div :style="{ transform: `scaleX(${progressScale})` }"></div>
            </div>
        </bxs-layout>
    </div>
</template>

<script>
export default {
    name: 'preloader',
    props: {
        resources: {
            type: Array,
            required: false,
            default: () => []
        },
        fixedValues: {
            type: Boolean,
            required: false,
            default: true
        },
        autoplay: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        progress () {
            if (this.resources.length === 0) return 0

            const progress = (100 / this.resources.length) * this.resolved
            return this.fixedValues ? Math.round(progress) : progress.toFixed(2)
        },
        progressScale () {
            if (this.resources.length === 0) return 0

            return 1 / (this.resources.length / this.resolved)
        }
    },
    data () {
        return {
            promises: [],
            resolved: 0
        }
    },
    mounted () {
        if (this.autoplay) this.$nextTick(this.start)
    },
    watch: {
        resolved (newVal) {
            if (newVal === this.promises.length) {
                this.complete()
            }
        }
    },
    methods: {
        start () {
            console.log('> preloader start()')

            if (!this.resources.length) return this.complete()

            this.resources.forEach((resource, index) => {
                let promise = null

                if (!resource.type || resource.type === 'img') {
                    promise = new Promise((resolve, reject) => {
                    const image = new Image()
                    image.src = resource.url

                    if (!image.complete) {
                        image.onload = () => resolve(image)
                        image.onerror = reject
                    } else {
                        resolve(image)
                    }
                    })
                } else if (resource.type === 'font') {
                    promise = resource.promise()
                } else if (resource.type === 'store_fetch') {
                    promise = this.$store.dispatch(resource.promise)
                } else if (resource.type === 'fetch') {
                    promise = fetch(resource.url)
                }

                if (index === 0) this.$nextTick(() => this.$emit('start'))

                promise.then((resourceLoaded) => {
                    this.resolved += 1
                    this.$emit('resource-load', {
                        id: resource.id,
                        resource: resourceLoaded
                    })
                }).catch((err) => {
                    this.$emit('resource-load-error', err)
                    this.resolved += 1
                })

                this.promises.push(promise)
            })

            return Promise.all(this.promises)
        },
        complete () {
            setTimeout(() => {
                this.$emit('complete')
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
  z-index: var(--layer-preloader);

  display: flex;
  justify-content: center;
  align-items: center;

  &--cnt {
    position: relative;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  &--progress {
    position: relative;
    width: 100%;
    max-width: 160px;
    margin: 0 auto;
    height: 2px;
    border-radius: 2px;
    background-color: rgb(220, 220, 220);
    margin-top: 2rem;

    > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: left bottom;
        transform: scaleX(0);
        transition: transform 0.5s ease-out;
        background-color: rgb(0, 0, 0);
    }
  }
}
</style>
