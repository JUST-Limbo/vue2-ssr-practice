import Vue from 'vue'
import DialogView from './DialogView.vue'


export default class Dialog{
  constructor(view,view2){
    this.dialog = new (Vue.extend(DialogView))()
    console.log(this.dialog)
    console.log(view)
    this.dialog.currentView = {
      mixins:[view,view2]
    }
    console.log(this.dialog.currentView)
    this.dialog.$mount()
  }

  show(){
    this.dialog.show()
  }
}
