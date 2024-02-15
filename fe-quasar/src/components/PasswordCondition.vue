<template>
  <!-- 비밀번호 조건 -->
  <div class="password-condition">
    <p
      v-for="(contents, index) in passwordCondition.contents"
      :key="`sentence-${index}`"
      class="condition-row"
    >
      <i
        :class="`${
          contents.isSatisfyCondition
            ? 'fi  fi-rr-check-circle positive'
            : 'fi fi-rr-exclamation negative'
        }`"
      />
      {{ contents.message }}
    </p>
  </div>
</template>

<script>
import { ref, reactive, computed, onUpdated } from "vue";

export default {
  props: {
    password: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let passwordCondition = reactive({
      /* 비밀번호 조건 */
      condition: {
        minLength: 8,
        maxLength: 13,
        isIncludeEnglish: false,
        isIncludeNumber: false,
        isIncludeSpecialSymbols: false,
        specialSymbols: "~!@#$%^&*_+`-{}:<>?,./",
      },

      /* 비밀번호 조건 필드 */
      contents: {
        length: {
          message: "",
          isSatisfyCondition: computed(() => lengthRange.value),
        },
        includeUpperCase: {
          message: "대문자 포함",
          isSatisfyCondition: computed(() => hasUpperCase.value),
        },
        includeLowerCase: {
          message: "소문자 포함",
          isSatisfyCondition: computed(() => hasLowerCase.value),
        },
        includeNumber: {
          message: "숫자 포함",
          isSatisfyCondition: computed(() => hasNumber.value),
        },
        includeSpecialSymbols: {
          message: "특수 문자 포함",
          isSatisfyCondition: computed(() => hasSpecialSymbols.value),
        },
        possibleSpecialCharacter: {
          message: "",
          isSatisfyCondition: computed(() => possibleSpecialCharacter.value),
        },
      },

      /* 모든 조건 만족 여부 */
      isSatisfyAllConditions: computed(
        () =>
          lengthRange.value &&
          hasUpperCase.value &&
          hasLowerCase.value &&
          hasNumber.value &&
          possibleSpecialCharacter.value &&
          hasSpecialSymbols.value
      ),
    });

    // TODO:  조건 오브젝트로 묶어 정리 필요
    /**
     * 길이 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let lengthRange = computed(() => {
      const regex = new RegExp(
        `^.{` +
          passwordCondition.condition.minLength +
          `,` +
          passwordCondition.condition.maxLength +
          `}$`
      );

      return regex.test(props.password);
    });

    /**
     * 영문 대문자 포함 조건
     * @since 2023.12.12
     * @author sjchoi
     */
    let hasUpperCase = computed(() => {
      const regex = new RegExp(/[A-Z]{1,}/g);

      return regex.test(props.password);
    });

    /**
     * 영문 소문자 포함 조건
     * @since 2023.12.12
     * @author sjchoi
     */
    let hasLowerCase = computed(() => {
      const regex = new RegExp(/[a-z]{1,}/g);

      return regex.test(props.password);
    });

    /**
     * 숫자 포함 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let hasNumber = computed(() => {
      const regex = new RegExp(/[0-9]{1,}/g);

      return regex.test(props.password);
    });

    /**
     * 사용 가능 특수 문자 포함 조건
     * @since 2023.08.30
     * @author sjchoi
     */
    let possibleSpecialCharacter = computed(() => {
      const specialCharacterRegex = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]{1,}/g;
      const specialSymbolsRegex = new RegExp(
        `[^${passwordCondition.condition.specialSymbols
          ?.replace(/\\/g, "\\\\")
          .replace(/\-/g, "\\-")}]`
      );

      let joinedSpecialCharacter = props.password
        .match(specialCharacterRegex)
        ?.join("");

      return !specialSymbolsRegex.test(joinedSpecialCharacter);
    });

    /**
     * 특수 문자 포함 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let hasSpecialSymbols = computed(() => {
      const regex = new RegExp(/[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]{1,}/g);
      return regex.test(props.password);
    });

    /**
     * 비밀번호 길이 조건문 설정
     * @since 2023.08.23
     * @author sjchoi
     */
    let getLengthCondition = () => {
      passwordCondition.contents.length.message = `${passwordCondition.condition.minLength}자 이상 ${passwordCondition.condition.maxLength}자 이하 길이 `;
    };
    getLengthCondition();

    /**
     * 사용 가능 특수 문자 조건문 설정
     * @since 2023.08.23
     * @author sjchoi
     */
    let getPossibleSpecialCharacterCondition = () => {
      passwordCondition.contents.possibleSpecialCharacter.message = `사용 가능한 특수 문자는 ${passwordCondition.condition.specialSymbols} 입니다.`;
    };
    getPossibleSpecialCharacterCondition();

    /**
     * 비밀번호 조건 모두 만족 여부
     * @since 2023.08.24
     * @author sjchoi
     */
    let isValid = computed(() => {
      return passwordCondition.isSatisfyAllConditions;
    });

    onUpdated(() => {
      emit("isValid", isValid.value);
    });

    return {
      passwordCondition,
      isValid,
    };
  },
};
</script>

<style lang="scss" scoped>
.password-condition {
  display: flex;
  padding: 12px;
  background: $color-gray-50;
  border-radius: $generic-border-radius;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;

  .condition-row {
    display: flex;
    height: 12px;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    line-height: 12px;
    color: $color-dark;

    .fi {
      display: flex;
      width: 14px;
      // padding: 4px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      align-self: stretch;

      &:before {
        font-size: 14px;
        line-height: 14px;
      }
    }
  }

  p {
    margin: 0;
  }
}

// icon type
.positive {
  color: $color-positive !important;
}
.negative {
  color: $color-negative !important;
}

// 유효성 메시지
.invalid {
  padding-bottom: 16px;
}

.valid {
  padding-bottom: 0px;
}
</style>
