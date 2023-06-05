<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <span>这是一段信息</span>
    <component :is="currentView" ref="content"></component>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentView: null,
    };
  },
  methods: {
    show() {
      console.log(this)
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
      this.$destroy();
    },
  },
  beforeDestroy(){
    document.body.removeChild(this.$el)
    console.log('beforeDestroy')
  }
};
</script>

<style></style>
