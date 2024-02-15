<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    /* 아이콘 설정 */
    this.$q.iconMapFn = (iconName) => {
      /**
       * Uicons 라이브러리 아이콘
       *
       * - 사용 예시 : <q-icon name="fi-*" />
       */
      if (iconName.startsWith("fi-") === true) {
        return {
          cls: "fi " + iconName,
        };
      }

      /**
       * 커스텀 아이콘
       *
       * - 사용 예시 : <q-icon name="custom-icon-*" />
       */
      if (iconName.startsWith("custom-icon-") === true) {
        return {
          cls: "pci " + iconName,
        };
      }
    };
  },
};
</script>
