<!--
*@Description:描述
*@Author: Jackson
*@CreateTime: 2023年09月16日 14:43:40
*@UpdateTime: ''
-->
<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: none;
  overflow: hidden;
  font-size: 1em;
}
.icon-code {
  vertical-align: 0;
}
</style>
