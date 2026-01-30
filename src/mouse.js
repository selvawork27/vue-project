import { onMounted, onUnmounted, ref } from "vue";

export function useMouse(){
    const x=ref(0)
    const y=ref(0)
    function update(event){
        x.value=event.pageX
        y.value=event.pageY
    }
    onMounted(()=>window.addEventListener('mouseover',update))
    onUnmounted(()=>window.removeEventListener('mouseover',update))

    return {x,y}
}

