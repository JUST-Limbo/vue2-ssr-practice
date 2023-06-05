<template>
  <div>
    <el-button @click="toggle(true)">show</el-button>
    <el-button @click="toggle(false)">hide</el-button>
  </div>
</template>

<script>
import elDialog from "@/components/dialog/elDialog.js";
import dialogContent2 from "./dialogContent2.vue";

let dialog;

export default {
  methods: {
    toggle(val) {
      if (val) {
        dialog = new elDialog(dialogContent2, {
          msg: "abc",
        });
        dialog.show();
      } else {
        dialog && dialog.hide();
      }
    },
  },
};
</script>

<style></style>
