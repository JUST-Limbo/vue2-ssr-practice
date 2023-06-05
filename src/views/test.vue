<template>
  <div>
    test
    <span v-if="defer(1)">12312</span>
    <span v-if="defer(2)">12312</span>
    <span v-if="defer(3)">12312</span>
    <span v-if="defer(4)">12312</span>
    <button @click="displayPriority++">displayPriority++</button>
    <button @click="n++">displayPriority++</button>
    <ul style="height:100px;overflow:auto" v-infinite-scroll="load">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayPriority: 0,
      n: "1",
      count: 0
    };
  },
  methods: {
    defer(priority) {
      console.log("defer go");
      return this.displayPriority >= priority;
    },
    load() {
      this.count += 12;
    }
  }
};
</script>
