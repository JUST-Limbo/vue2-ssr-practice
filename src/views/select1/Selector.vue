<template>
  <div :class="[customClass]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Selector",
  inheritAttrs: false,
  props: {
    value: {
      required: true
    },
    multiple: Boolean,
    customClass: String
  },
  provide() {
    return {
      $Selector: this
    };
  },
  created() {
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit("input", []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit("input", "");
    }
  },
  methods: {
    onOptionSelect(option) {
      if (this.multiple) {
        const targetIndex = this.value.indexOf(option.value);
        const valueClone = this.value.slice();
        if (targetIndex > -1) {
          valueClone.splice(targetIndex, 1);
        } else {
          valueClone.push(option.value);
        }
        this.$emit("input", valueClone);
      } else {
        this.$emit("input", option.value);
      }
    },
    calcItemActive(itemValue) {
      if (this.multiple) {
        return this.value.includes(itemValue);
      } else {
        return this.value == itemValue;
      }
    }
  }
};
</script>
