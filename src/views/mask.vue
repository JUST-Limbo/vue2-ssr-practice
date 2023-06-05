<template>
  <div class="mask">
    <div class="content">
      123123
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: red;
}
.content {
  position: relative;
  top: 50%;
  left: 50%;
  background-color: aqua;
  transform: translate(-50%, -50%);
}
</style>
