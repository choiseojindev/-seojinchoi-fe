<template>
  <div class="toastmessage"></div>
</template>

<script>
import { Notify } from "quasar";

export default {
  setup() {
    // TODO: 계정 생성 완료 후
    /**
     * how to use
     * import ToastMessage from "components/ToastMessage";
     * <ToastMessage ref="toastMessage" />
     * refs.toastMessage.value.setToastMessage("type", "message");
     */
    // type : positive, info, warning, negative, progress
    let setToastMessage = (type, message) => {
      Notify.create({
        type: type,
        message:
          type === "negative"
            ? message
              ? message
              : "일시적인 문제가 발생하였습니다.<br> 다시 시도해 주세요."
            : message,
        position: "top",
        group: false,
        progress: true,
        html: true,
        // timeout: 3000,
      });
    };

    return {
      setToastMessage,
    };
  },
  created() {
    // 타입 생성
    Notify.registerType("positive", {
      icon: "fi-rr-comment-check",
      textColor: "positive",
      classes: "positive",
    });

    Notify.registerType("info", {
      icon: "fi-rr-comment-dots",
      textColor: "info",
      classes: "info",
    });

    Notify.registerType("warning", {
      icon: "fi-rr-comment-exclamation",
      textColor: "warning",
      classes: "warning",
    });

    Notify.registerType("negative", {
      icon: "fi-rr-comment-xmark",
      textColor: "negative",
      classes: "negative",
    });

    Notify.registerType("progress", {
      spinner: true,
    });
  },
};
</script>

<style lang="scss" scope>
.toastmessage {
  display: none;
}
</style>
