<template>
  <div>
    123123
    <div>fatherObj:{{JSON.stringify(fatherObj)}}</div>
    <son :objFromFather="fatherObj"></son>
  </div>
</template>

<script>
import Son from './son.vue'
export default {
  name:'father',
  components:{
    Son
  },
  data () {
    return {
      fatherObj:{
        n:0
      }
    }
  }
}
</script>
