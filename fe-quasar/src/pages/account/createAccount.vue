<template>
  <Layout>
    <div class="create-form">
      <div class="header-section">
        <!-- <img src="~assets/logo.png" alt="logo" width="10%" /> -->
        <!-- 스텝 -->
        <div class="stepper">
          <div
            class="step-box"
            :class="stepper.step > 0 ? 'active-step' : ''"
          />
          <div
            class="step-box"
            :class="stepper.step > 1 ? 'active-step' : ''"
          />
          <div
            class="step-box"
            :class="stepper.step > 2 ? 'active-step' : ''"
          />
          <div
            class="step-box"
            :class="stepper.step > 3 ? 'active-step' : ''"
          />
        </div>

        <!-- 안내 메시지 -->
        <div
          v-for="(contents, index) in stepper.contents"
          :key="index"
          class="header-text"
        >
          <p v-if="contents.step === stepper.step">
            {{ contents.message }}
          </p>
        </div>
      </div>

      <div class="login-section">
        <!-- step1: 약관 동의 -->
        <form
          v-if="stepper.step === 1"
          class="agreeTerms form-wrap"
          @submit.prevent="submitAgreeTerms"
        >
          <!-- 약관 전체 동의 -->
          <div class="check-wrap">
            <q-checkbox
              v-model="terms.selectAll.isSelected"
              :label="terms.selectAll.message"
              class="check"
              @input="agreeAllTerms"
            />
          </div>

          <!-- 약관 안내 메시지 -->
          <div class="terms-notice">
            본 마케팅 활용 및 정보 수신에 대한 동의를 거부하실 수 있으며, 이
            경우 회원 가입은 가능하나 일부 서비스 이용 및 이벤트 안내 등의
            서비스 제공이 제한될 수 있습니다.
          </div>

          <div class="line" />

          <div class="terms">
            <!-- 약관 -->
            <div
              v-for="(options, index) in terms.options"
              :key="index"
              class="check-wrap"
            >
              <q-checkbox
                v-model="options.isSelected"
                :label="options.label"
                class="check"
                @input="agreeTerm($event)"
              />
            </div>
          </div>

          <q-btn
            :class="isSelectedAllRequiredTerms ? 'active' : 'inactive'"
            :disabled="!isSelectedAllRequiredTerms"
            class="createAccountButton"
            type="submit"
            color="primary"
            label="다음"
          />
        </form>
      </div>

      <!-- 버튼 하단 안내 텍스트  -->
      <div class="set-account-wrap flex align-items-center flex-end mt-20">
        <!-- 로그인 페이지로 이동 버튼 -->
        <div
          v-if="stepper.step === 1 || stepper.step === 2 || stepper.step === 4"
          class="create-account flex align-items-center justify-content-center"
        >
          <p class="create-text m-0">이미 계정이 있나요?</p>
          <q-btn
            class="text-button"
            flat
            color="primary"
            label="로그인"
            @click="routeToLogin"
          />
        </div>

        <!-- 인증 번호 메일 다시 보내기 버튼 -->
        <div
          v-if="stepper.step === 3"
          class="create-account flex align-items-center justify-content-center"
        >
          <p class="create-text m-0">이메일을 확인할 수 없나요?</p>
          <p class="create-text m-0">스팸 편지함 확인 또는</p>
          <q-btn
            class="text-button"
            flat
            color="primary"
            label="인증 번호 메일 다시 보내기"
            @click="resendCertificationCode"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// import { Loading } from "quasar";
import { i18n } from "boot/i18n";
import { ref, reactive, computed } from "vue";
import { useStore } from "src/store";
import { useRouter } from "src/router";
// import { filterSplitUpText } from "src/utils/filter";
// import { useVuelidate } from "@vuelidate/core";
// import { helpers, required } from "@vuelidate/validators";
// import { getInvalidRefElement } from "src/utils/validation";
// import { api_cloud_user, api_policy, base_api_policy } from "boot/axios";
// import PasswordCondition from "components/Password/PasswordCondition";
// import accountAPI from "src/services/account.js";
// import authAPI from "src/services/auth.js";
// import ToastMessage from "components/ToastMessage";

import Layout from "layouts/MainLayout.vue";

const router = useRouter();

export default {
  components: {
    Layout,
    // PasswordCondition,
    // ToastMessage,
  },
  setup() {
    const store = useStore();

    const refs = {
      id: ref(null),
      password: ref(null),
      confirmPassword: ref(null),
      name: ref(null),
      certificationCode: ref(null),
      certifyServiceAlias: ref(null),
      toastMessage: ref(null),
    };

    const languageOptions = [
      { code: "ko-KR", name: "한국어" },
      { code: "en-US", name: "English" },
    ];

    let currentLanguage = ref(
      languageOptions.filter((language) => language.code === i18n.locale)[0] ||
        languageOptions[0]
    );

    /**
     * 언어 설정
     * @param {Obejct} selectedInfo 선택한 언어 정보
     * @since 2023.06.28
     * @author hskim
     */
    let setLanguage = (selectedInfo) => {
      const { code } = selectedInfo || {};

      i18n.locale = code || languageOptions[0].code;
    };

    /* -- step 설정 -- */
    let stepper = reactive({
      step: computed(() => store?.state?.view.step),
      contents: [
        { step: 1, message: "계정 서비스 약관에 동의해 주세요." },
        { step: 2, message: "PETRA 계정으로 사용할 정보를 입력해 주세요." },
        { step: 3, message: "PETRA 계정 이메일 인증을 진행해 주세요." },
        { step: 4, message: "PETRA 서비스 별칭을 입력해 주세요." },
      ],
    });

    /* -- step 1. 약관 동의 -- */
    let terms = reactive({
      item: [],
      selectAll: { isSelected: false, message: "모두 동의합니다." },
      options: [
        {
          label: "[필수] 약관에 동의합니다.",
          value: "term1",
          isSelected: false,
          isRequired: true,
        },
        {
          label: "[필수] 개인정보 수집 및 이용에 동의합니다.",
          value: "term2",
          isSelected: false,
          isRequired: true,
        },
        {
          label: "[선택] 광고성 정보 수신에 동의합니다.",
          value: "term3",
          isSelected: false,
          isRequired: false,
        },
      ],
    });

    // 필수 약관 동의 여부
    let isSelectedAllRequiredTerms = computed(
      () => terms.options[0].isSelected && terms.options[1].isSelected
    );

    /**
     * 약관 전체 동의
     * @since 2023.09.04
     * @author sjchoi
     */
    let agreeAllTerms = () => {
      const isAgreeAllTerms = terms.selectAll.isSelected;

      const termsLength = terms.options.length;

      // TODO: 약관 전체 동의
      if (isAgreeAllTerms) {
        let i;
        for (i = 0; i < termsLength; i++) {
          terms.options[i].isSelected = true;
        }
      } else {
        // 전체 동의 취소
        let i;
        for (i = 0; i < termsLength; i++) {
          terms.options[i].isSelected = false;
        }
      }
    };

    /**
     * 약관 동의
     * @since 2023.09.04
     * @author sjchoi
     */
    let agreeTerm = (event) => {
      const termsLength = terms.options.length;

      // 약관 모두 직접 클릭할 시 전체 선택 버튼 true
      let i;
      if (!terms.selectAll.isSelected) {
        for (i = 0; i < termsLength; i++) {
          if (terms.options[i].isSelected === false) {
            return;
          } else {
            // 약관이 모두 선택되어 있다면
            if (i === termsLength - 1) {
              terms.selectAll.isSelected = true;
            }
          }
        }
      }

      // 전체 선택 되어있을 시 약관 취소 시 전체 선택 버튼 false
      if (terms.selectAll.isSelected && !event) {
        {
          terms.selectAll.isSelected = false;
        }
      }
    };

    /**
     * step 2로 이동
     * @since 2023.09.04
     * @author sjchoi
     */
    let submitAgreeTerms = () => {
      //   store.dispatch("view/setStep", 2);
    };

    /* -- step 2. 계정 정보 입력 -- */
    let user = reactive({
      form: {
        id: "",
        name: "",
        password: "",
        confirmPassword: "",
        corporation: "",
        certificationCode: "",
        certifyServiceAlias: "",
      },
      isPassword: true,
      isConfirmPassword: true,
      // 이메일 인증 코드
      certificationCode: {
        maxLength: 6,
      },
      // 서비스 별칭
      certifyServiceAlias: {
        // 허용 특수문자
        specialSymbols: "-",

        isFocused: false,
        minLength: 4,
        maxLength: 80,
      },
    });

    let isDuplicatedEmail = ref(false);
    let isWorngFormatEmail = ref(false);

    /**
     * 포커스 아웃 시, 이메일 중복 여부 체크
     * @since 2023.09.06
     * @author sjchoi
     */
    let checkEmaillDuplication = async () => {
      console.log("## 이메일 포커스 아웃");
      // 초기화
      // v$.value.id.$reset()
      isDuplicatedEmail.value = false;
      isWorngFormatEmail.value = false;

      const validator = v$.value.id;
      validator.$validate();

      // NOTICE: 포커스 아웃될 때 마다 중복 및 형식 검사 진행해야하므로, invalid 상태에서도 api 호출 진행

      if (user.form.id === "") {
        // 비어있을 시 포커스 아웃될 때 중복 여부 체크 X
        return;
      }

      accountAPI
        .confirmEmailDuplication(user.form.id)
        .then((data) => {
          // console.log("##성공 ", data);

          // 이메일 중복인 경우
          isDuplicatedEmail.value = data.data.duplicated === true;
        })
        .catch((error) => {
          // console.log("##실패 ", error);
          const WRONG_EMAIL_FORMAT_CODE = -40219;

          // 잘못된 이메일 형식
          isWorngFormatEmail.value = error.code === WRONG_EMAIL_FORMAT_CODE;
        })
        .finally(() => {
          //
        });
    };

    /* step 2 유효성 */
    // let rules = {
    //   id: {
    //     required: helpers.withMessage("이메일을 입력해 주세요.", required),
    //     duplicated: helpers.withMessage("이미 등록된 이메일입니다.", () => {
    //       return !isDuplicatedEmail.value;
    //     }),
    //     format: helpers.withMessage("이메일 형식이 올바르지 않습니다.", () => {
    //       return !isWorngFormatEmail.value;
    //     }),
    //   },
    //   password: {
    //     required: helpers.withMessage("비밀번호를 입력해 주세요.", required),
    //     valid: helpers.withMessage(
    //       "비밀번호 조건에 맞지 않습니다. 다시 입력해 주세요.",
    //       () => {
    //         return isSatisfyAllPasswordConditions.value;
    //       }
    //     ),
    //   },
    //   confirmPassword: {
    //     required: helpers.withMessage(
    //       "비밀번호 확인을 입력해 주세요.",
    //       required
    //     ),
    //     sameAs: helpers.withMessage(
    //       "비밀번호와 다릅니다. 입력 값을 확인해 주세요.",
    //       () => {
    //         return isSameAsPassword.value;
    //       }
    //     ),
    //   },
    //   name: {
    //     required: helpers.withMessage("이름을 입력해 주세요.", required),
    //   },
    //   // NOTICE: 회사명 필수 ??
    //   corporation: {
    //     required: helpers.withMessage("회사명을 입력해 주세요.", required),
    //   },
    // };

    // const v$ = useVuelidate(
    //   rules,
    //   user.form,
    //   {
    //     $lazy: true,
    //   },
    //   { $scope: false }
    // );

    let isSameAsPassword = ref(false);
    let isSatisfyAllPasswordConditions = ref(false);

    /**
     * 비밀번호 만족 여부 검사
     * @since 2023.08.30
     * @author sjchoi
     */
    let verifyCondition = (isSatisfy) => {
      isSatisfyAllPasswordConditions.value = isSatisfy;
    };

    /**
     * 비밀번호와 비밀번호 확인 동일 여부 검증
     * @since 2023.08.30
     * @author sjchoi
     */
    let inputPassword = () => {
      isSameAsPassword.value = user.form.password === user.form.confirmPassword;
    };

    /**
     * 비밀번호 확인 입력
     * @since 2023.08.24
     * @author sjchoi
     */
    let inputConfirmPassword = () => {
      isSameAsPassword.value = user.form.password === user.form.confirmPassword;
    };

    /**
     * 계정 정보 제출
     * @since 2023.07.31
     * @author sjchoi
     */
    // let submitInputAccountInformation = async (event) => {
    //   const validator = v$.value;
    //   validator.$validate();

    //   const isValid = await !v$.value.$error;

    //   if (!isValid) {
    //     const $el = getInvalidRefElement(validator, refs);

    //     // 유효성 포커싱
    //     $el.focus();

    //     return;
    //   }

    //   /* 에러 메시지 초기화 */
    //   inputAccountInformationError.hasError = false;
    //   inputAccountInformationError.message = "";

    //   // 로딩
    //   Loading.show();

    //   accountAPI
    //     .createAdminAccount(user.form)
    //     .then((data) => {
    //       // console.log("##성공 ", data);

    //       store.dispatch("auth/setEmail", user.form.id);
    //       store.dispatch("view/setStep", 3);
    //     })
    //     .catch((error) => {
    //       // console.log("##실패 ", error);

    //       inputAccountInformationError.hasError = true;
    //       inputAccountInformationError.message = error.message;
    //     })
    //     .finally(() => {
    //       Loading.hide();
    //       //
    //     });
    // };

    /**
     * 특수 문자 포함 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let hasSpecialSymbols = computed(() => {
      const regex = new RegExp(/[A-Za-z]{1,}/g);
      return regex.test(user.form.certifyServiceAlias);
    });

    // TODO: 유효성 유틸 파일로 이동
    let specialCharactor = computed(() => {
      // NOTICE: 한글은 두 번 입력해야 유효성 체크되는 이슈
      if (hasSpecialSymbols.value) {
        // console.log("--특수문자 있음");

        const specialSymbolsRegex = new RegExp(
          `[^a-zA-Z${user.certifyServiceAlias.specialSymbols}]`
        );

        return !specialSymbolsRegex.test(user.form.certifyServiceAlias);
      } else {
        // console.log("--특수문자 없음");

        const regex = new RegExp(`[^0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]{1,}`);

        return regex.test(user.form.certifyServiceAlias);
      }
    });

    /**
     * 길이 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let lengthRange = computed(() => {
      const regex = new RegExp(
        `^.{` +
          user.certifyServiceAlias.minLength +
          `,` +
          user.certifyServiceAlias.maxLength +
          `}$`
      );

      return regex.test(user.form.certifyServiceAlias);
    });

    /**
     * 영문 포함 조건
     * @since 2023.08.24
     * @author sjchoi
     */
    let hasEnglish = computed(() => {
      const regex = new RegExp(/[A-Za-z]{1,}/g);

      return regex.test(user.form.certifyServiceAlias);
    });

    /**
     * 서비스 별칭 조건 충족 여부
     * @since 2023.09.06
     * @author sjchoi
     */
    let possibleServiceAlias = reactive({
      isSatisfyAllCondition: computed(
        () => hasEnglish.value && lengthRange.value && specialCharactor.value
      ),
    });

    /* 에러 */
    let inputAccountInformationError = reactive({
      hasError: false,
      message: "",
    });

    let certifyEmailError = reactive({
      hasError: false,
      message: "",
    });

    let certifyAliasError = reactive({
      hasError: false,
      message: "",
    });

    let accountInformationParsedMessage = computed(() =>
      filterSplitUpText(inputAccountInformationError.message)
    );
    let certifyEmailParsedMessage = computed(() =>
      filterSplitUpText(certifyEmailError.message)
    );
    let certifyAliasParsedMessage = computed(() =>
      filterSplitUpText(certifyAliasError.message)
    );

    /**
     * 로그인 페이지로 이동
     * @since 2023.09.05
     * @author sjchoi
     */
    let routeToLogin = () => {
      //   store.dispatch("view/setStep", 1);
      router.push({ name: "login" }).catch(() => {});
    };

    /**
     * 인증 번호 메일 다시 보내기
     * @since 2023.09.06
     * @author sjchoi
     */
    let resendCertificationCode = () => {
      Loading.show();
      console.log("## 인증 번호 메일 다시 보내기");
      //   TODO: 인증 메일 API 연결
      authAPI
        .resendCertificationCode(user.form.id)
        .then((data) => {
          console.log("## 인증 번호 재전송 성공 ", data);
        })
        .catch((error) => {
          console.log("## 인증 번호 재전송 실패 ", error);
        })
        .finally(() => {
          Loading.hide();
        });
    };

    return {
      ...refs,
      //   v$,
      //   v2$,
      //   v3$,
      user,
      inputAccountInformationError,
      certifyEmailError,
      accountInformationParsedMessage,
      certifyEmailParsedMessage,
      certifyAliasParsedMessage,
      //   submitInputAccountInformation,
      languageOptions,
      currentLanguage,
      setLanguage,
      inputConfirmPassword,
      verifyCondition,
      inputPassword,
      stepper,
      terms,
      agreeAllTerms,
      agreeTerm,
      submitAgreeTerms,
      isSelectedAllRequiredTerms,
      routeToLogin,
      //   certifyEmailAdress,
      //   certification,
      //   maximumLengthCertificationCode,
      //   resendCertificationCode,
      possibleServiceAlias,
      checkEmaillDuplication,
      certifyAliasError,

      // NOTE: 프리 로딩 테스트 코드
      preLoadingTest() {
        Loading.show();

        setTimeout(() => {
          Loading.hide();
        }, 3000);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.create-form:deep {
  width: 55%;

  //TODO:  해상도 확대시 이슈 처리
  @media (max-width: 1600px) {
    & {
      scale: 0.895;
      width: 40%;
    }
  }

  .header-section {
    //   height: 87px;
    width: 100%;
    margin-bottom: 60px;

    @media (max-width: 1600px) {
      margin-bottom: 20px;
    }
    // TODO: 색상 코드 변경
    .stepper {
      width: 30%;
      height: 8px;
      // margin-top: 32px;

      display: flex;

      .step-box {
        width: 25%;
        height: 100%;
        background-color: #cacaca;
      }

      .step-box:first-child {
        border-radius: 8px 0px 0px 8px;
      }

      .step-box:last-child {
        border-radius: 0px 8px 8px 0px;
      }

      .active-step {
        background-color: #3f38ff;
      }
    }

    .header-text {
      font-size: 22px;
      font-weight: 700;
      line-height: 22.5px;
      margin-top: 20px;

      @media (max-width: 1600px) {
        font-size: 18px;
      }
    }
  }

  .login-section {
    width: 100%;

    .form-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;

      // 약관 동의
      .terms-notice {
        color: #878787;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px; /* 116.667% */
        letter-spacing: -0.36px;
      }
      .terms {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 12px;
      }

      .check-wrap {
        width: 100%;
        // 체크박스
        // TODO: 체크 누르지 않았을 때 체크 아이콘 추가
        .check {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .q-checkbox__inner {
          width: 16px;
          min-width: 16px;
          height: 16px;
          border-radius: 5px;

          .q-checkbox__bg {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 5px;
            border: none;
          }

          &--falsy {
            background: #dfdfdf;
          }

          &--truthy {
            background: #5d5bd4;
          }
        }

        // 약관 텍스트
        .q-checkbox__label {
          color: #495057;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 14px;
          height: 16px;
          display: flex;
          align-items: center;
        }
      }

      .line {
        width: 100%;
        height: 1px;
        background: #d9d9d9;
        border-radius: 8px;
      }

      // 인증 안내 메시지
      .certify-text-wrap {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-content: flex-start;
        gap: 12px;
        margin-bottom: 20px;

        .certify-email {
          color: #495057;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
        }

        .certify-text {
          color: #646a70;
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
        }
      }

      .condition-text-wrap {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-content: flex-start;
        gap: 4px;
        margin-top: 4px;

        .condition-text {
          color: #a8a8a8;
          font-size: 12px;
          line-height: 20px;
        }
      }

      .createAccountButton {
        width: 100%;
        height: 48px;
      }
    }
  }

  .set-account-wrap {
    .create-account {
      gap: 10px;

      .create-text {
        color: #a8a8a8;
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
      }
    }

    .q-btn__wrapper {
      padding: 0;
      min-height: 0;
    }

    // 버튼 배경
    .q-btn--active .q-hoverable:hover {
      .q-focus-helper {
        background: transparent;
        background-color: transparent !important;
      }
    }
    .q-focusable:focus {
      .q-focus-helper {
        background: transparent;
        background-color: transparent !important;
      }
    }

    .q-focus-helper,
    .q-focus-helper:before,
    .q-focus-helper:after {
      transition: none;
    }
  }
}

.fi {
  font-size: 0.875rem;
  height: 14px;
  line-height: 14px;
}

// 선택
.optional {
  display: inline;
  margin-left: 0.3rem;
  //   color: $color-gray-400;
}

// 로그인 버튼
.q-btn__wrapper {
  padding: 16px 12px;
}
.q-btn {
  font-weight: 700;
  line-height: 16px;
}
// .bg-negative-light {
//   color: $color-negative !important;
//   background: $color-negative-light-more !important;
// }

// 버튼 활성 여부
.active {
  //   background: $color-primary;
}
.inactive {
  //   background-color: $color-gray-300 !important;
}
</style>
