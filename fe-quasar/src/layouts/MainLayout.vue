<template>
  <div class="wrap">
    <div class="header">
      <!-- 헤더 -->
      <!-- logo-devchoiseojin -->
      <img
        alt="logo"
        src="~assets/logo-devchoiseojin.png"
        style="height: 40px"
      />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;

  .header {
    width: 100%;
    height: 80px;
    padding: 20px;
    border-bottom: 1px solid #efeff4; //TODO: color 변수화
    // background: blue;
  }

  .content {
    width: 100%;
    height: calc(100vh - 80px);
    // background: yellow;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
