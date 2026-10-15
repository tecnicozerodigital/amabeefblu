import sticky from './sticky'
import scrollAnim from './scrollAnim'
import vConfirm from './confirm'
import { isWebpSupported } from '../assets/libs/utils'

export default function create(app) {
    app.directive('sticky', sticky)
    app.directive('scroll-anim', scrollAnim)
    app.directive('confirm', vConfirm)

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
}