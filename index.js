
function getTemplate(state) {
    return `<div class="slider_before" style="width: ${state.width}px; background-image: url(${state.before})">
        <div class="slider_resize" data-type="resize"></div>
    </div>
    <div class="slider_after" style="background-image: url(${state.after})"></div>`
}

class Slider {
    constructor(selector, state) {
        this.$selector = document.getElementById(selector)

        this.#listen()
        this.state = {
            ...state,
            width: state.width || 512
        }

        this.#render(this.state)
    }

    #render(state) {
        this.$selector.innerHTML = getTemplate(state)

    }

    #listen() {
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$selector.addEventListener('mousedown', this.mouseDownHandler)
        this.$selector.addEventListener('mouseup', this.mouseUpHandler)
    }

    mouseDownHandler(event)  {
        this.startX = event.clientX
        if(event.target.dataset.type === 'resize') {
            this.$selector.addEventListener('mousemove', this.moveHandler)
        }
    }
    mouseUpHandler(event)  {
        this.$selector.removeEventListener('mousemove', this.moveHandler)
    }

    moveHandler(event)  {
        this.result = this.startX - event.clientX
        this.#render({width: this.state.width - this.result})
        this.startX = event.clientX
        console.log(this.result)
    }
}

const slider = new Slider('slider', {
    before: './assets/istockphoto-113494458-612x612.jpeg',
    after: './assets/make-water-safe-twitter-card.jpeg'
})