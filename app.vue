<template>
  <div>
    <h1 class="absolute flex text-3xl font-bold underline">Hello world!</h1>
    <div class="box"></div>
    <NuxtWelcome />
  </div>
</template>
<script lang="ts" setup>
console.log('hello')
</script>
<style lang="scss">
.box {
  position: absolute;
  top: 50%;
  padding: 0;
  background-color: #fff;
}
</style>
