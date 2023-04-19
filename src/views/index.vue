<template>
  <div class="self_content">
    <div>123</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getRestaurantNew } from '@/js/api/index.js'
export default {
  setup () {
    const name = ref('hello');
    return {
      name
    }
  },
  mounted () {
    this.loadApi()
  },
  methods: {
    loadApi () {
      getRestaurantNew({
        pageIndex: 1,
        brandId:
          972,
        mapY: '',
        mapX: '',
        address: '',
        type: 0
      }).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>