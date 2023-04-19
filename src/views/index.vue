<template>
  <div class="self_content">
<div>123</div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup () {
    const name = ref('hello');
    return {
      name
    }
  },
  mounted () {
    console.log(this.name,this.$cDB.set('name','xiaoming'));
  }
}
</script>

<style lang="less" scoped>
</style>