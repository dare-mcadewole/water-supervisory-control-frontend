<template>
  <object type="image/svg+xml"
    :data="'/ionicons/' + $slots.default[0].text + '.svg'"
    :style="`width: ${size}px; height: ${size}px; fill: ${color};`" >
  </object>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 23
    },
    color: {
      type: String,
      default: '#FFF'
    }
  }
}
</script>
