export default {
    methods: {
        semiFixed (elID, bottomID, topPadding = 50) {
            const el = document.getElementById(elID)
            const bottomEl = document.getElementById(bottomID)

            function distanceToTop (e) {
                return window.pageYOffset + e.getBoundingClientRect().top
            }

            el.classList.add('semifixed--anchor')

            const { height, width } = el.getBoundingClientRect()

            const rootPos = distanceToTop(el)

            console.log('mainPos', el.getBoundingClientRect())

            console.log('bottomPos', bottomEl.getBoundingClientRect())

            const defaultStyle = {
                top: el.style.top,
                height: el.style.height,
                width: el.style.width
            }

            function setAnchor() {
                el.classList.add('semifixed--anchor')
                el.classList.remove('semifixed--fixed')
                el.classList.remove('semifixed--bottom')
                el.style = {
                    ...el.style,
                    ...defaultStyle
                }
            }

            function setFixed() {
                el.classList.remove('semifixed--anchor')
                el.classList.add('semifixed--fixed')
                el.classList.remove('semifixed--bottom')
                el.style.top = topPadding + 'px'
                el.style.height = height + 'px'
                el.style.width = width + 'px'
            }

            function setBottom() {
                el.classList.remove('semifixed--anchor')
                el.classList.remove('semifixed--fixed')
                el.classList.add('semifixed--bottom')
                el.style = {
                    ...el.style,
                    ...defaultStyle
                }
                el.style.bottom = topPadding + 'px'
                el.style.height = height + 'px'
                el.style.width = width + 'px'
            }

            function runCore () {
                const mainPos = el.getBoundingClientRect()

                // console.log(mainPos.top <= topPadding, mainPos.top, topPadding)
                // console.log(!(bottomEl.getBoundingClientRect().top <= mainPos.top + mainPos.height + topPadding), bottomEl.getBoundingClientRect().top, mainPos.top)
                // console.log('')

                if (bottomEl.getBoundingClientRect().top <= mainPos.top + mainPos.height + topPadding) {
                    setBottom()
                } else if (distanceToTop(el) <= rootPos) {
                    setAnchor()
                } else if (mainPos.top <= topPadding && mainPos.top > 0) {
                    setFixed()
                }
            }

            window.onscroll = function () {
                runCore()
            }

            el.onclick = function () {
                runCore()
            }
        }
    }
}