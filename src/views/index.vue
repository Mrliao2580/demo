<template>
  <div class="self_content">
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
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
    console.log(this.name);
  }
}
</script>

<style lang="less" scoped>
</style>