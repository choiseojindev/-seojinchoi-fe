<template>
  <Layout
    ><router-view :key="$route.fullPath" />
    테스트 !
  </Layout>
</template>

<script>
import Layout from "layouts/MainLayout";

export default {
  components: { Layout },
  setup() {
    //
  },
};
</script>

<style lang="scss" scoped></style>
