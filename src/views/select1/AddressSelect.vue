<template>
  <div class="list">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="item"
      @click="selectAddress(item)"
      :class="{ active: value == item.id }"
    >
      <div>{{ item.date }}</div>
      <div>{{ item.name }}</div>
      <div>{{ item.address }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressSelect",
  model: {
    prop: "value",
    event: "select"
  },
  props: {
    value: [String, Number],
    data: Array
  },
  methods: {
    selectAddress(item) {
      this.$emit("select", item.id);
    }
  }
};
</script>
<style lang="scss">
.list {
  display: flex;
  .item {
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    width: 178px;
    height: 178px;
    border-radius: 6px;
    margin-left: 6px;
    &.active {
      background-color: #409eff;
    }
  }
}
</style>
