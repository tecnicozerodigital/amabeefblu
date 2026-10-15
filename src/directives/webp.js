import { isWebpSupported } '../assets/libs/utils'

app.directive('webp-img', {
    beforeMount(el, binding) {
        let url = binding.value
        if (isWebpSupported() && url) {
            url = url.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        }
        el.src = url
    },
    updated(el, binding) {
        let url = binding.value
        if (isWebpSupported() && url) {
            url = url.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        }
        el.src = url
    }
})
