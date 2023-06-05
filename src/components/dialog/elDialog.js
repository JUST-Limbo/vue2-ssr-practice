import Vue from "vue";
import elDialogVue from "./elDialogView.vue";

export default class elDialogView {
  constructor(view, cfg) {
    this.dialog = new (Vue.extend(elDialogVue))();
    this.dialog.currentView = {
      mixins: [view],
      data() {
        return {
          ...cfg,
        };
      },
    };
    this.dialog.$mount();
    document.body.appendChild(this.dialog.$el)
  }
  show() {
    this.dialog.show();
  }
  hide() {
    this.dialog.hide();
  }
}
