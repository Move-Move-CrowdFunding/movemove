<template>
  <div>
    <h1 class="absolute flex text-3xl font-bold underline">Hello world!</h1>
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
const num: number = '123'
</script>
<style lang="scss">
.box {
  position: absolute;
  top: 50%;
  padding: 0;
  background-color: #fff;
}
</style>
