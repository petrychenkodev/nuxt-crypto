

import { ref, onMounted, onBeforeUnmount } from 'vue'

const tooSmall = ref(false)

const checkScreen = () => {
    tooSmall.value = window.innerWidth < 800
}

export function useScreenSize() {
    onMounted(() => {
        checkScreen()
        window.addEventListener('resize', checkScreen)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkScreen)
    })

    return {
        tooSmall,
    }
}