<template>
  <div>
    <!-- e.g.1 -->
    <div>{{ selectedValue }}</div>
    <Selector v-model="selectedValue" custom-class="horizontal-list">
      <SelectOption1
        v-for="item in tableData"
        :key="item.id"
        :value="item.id"
        v-bind="item"
      ></SelectOption1>
    </Selector>
    <!-- e.g.2 -->
    <div>{{ selectedValue2 }}</div>
    <Selector v-model="selectedValue2" multiple custom-class="vertical-list">
      <SelectOption2
        v-for="item in tableData"
        :key="item.id"
        :value="item.id"
        v-bind="item"
      ></SelectOption2>
    </Selector>
  </div>
</template>

<script>
import Selector from "./Selector.vue";
import SelectOption1 from "./SelectOption1.vue";
import SelectOption2 from "./SelectOption2.vue";

export default {
  components: {
    Selector,
    SelectOption1,
    SelectOption2
  },
  data() {
    return {
      selectedValue: "",
      selectedValue2: "",
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.horizontal-list {
  display: flex;
}
.vertical-list {
}
</style>
