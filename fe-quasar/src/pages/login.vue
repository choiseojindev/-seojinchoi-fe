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
      <div class="login-wrap">
        <div class="login-header">
          <div class="title">Login</div>
          <div class="sub-title">
            Hi, Welcome back to
            <span :style="'color : #1B0182'">devchoiseojin</span> 👋
          </div>
        </div>
        <div class="login-contents">
          <div class="input-wrap">
            <!-- TODO: input-wrap 컴포넌트화 -->
            <div>Email</div>
            <q-input
              outlined
              v-model="user.form.email"
              dense
              placeholder="e.g. choiseojindev@gmail.com"
            />
          </div>

          <div class="input-wrap">
            <!-- TODO: input-wrap 컴포넌트화 -->
            <div>Password</div>
            <!-- <q-input outlined v-model="text"  dense placeholder="enter your password"/> -->
            <q-input
              v-model="user.form.password"
              outlined
              :type="user.isPassword ? 'password' : 'text'"
              dense
              placeholder="enter your password"
            >
              <template v-slot:append>
                <q-icon
                  :name="user.isPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="user.isPassword = !user.isPassword"
                />
              </template>
            </q-input>
          </div>

          <div class="manage-account">
            <q-checkbox
              class="remember"
              v-model="user.isRemeberEmail"
              label="Remember Email?"
              dense
              @click="user.isRemeberEmail = !user.isRemeberEmail"
            />
            <q-btn
              flat
              dense
              color="primary"
              label="Forgot Password?"
              class="flat-button"
            />
            <!-- <div class="forgot">Forgot Password?</div> -->
          </div>

          <div class="submit-login">
            <q-btn
              type="submit"
              color="primary"
              label="Login"
              class="full-width"
            />
          </div>
        </div>

        <div class="login-footer">
          <span>Not registered yet?</span>
          <q-btn
            flat
            dense
            color="primary"
            label="Create an account"
            class="flat-button"
            @click="createAccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "src/router";

const router = useRouter();

export default {
  setup() {
    let user = reactive({
      form: {
        email: "",
        password: "",
      },
      isRemeberEmail: true,
      isPassword: true,
    });

    let createAccount = () => {
      router.push({ name: "createAccount" }).catch(() => {});
    };

    return {
      user,
      createAccount,
    };
  },
};
</script>

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

    // 로그인
    .login-wrap {
      width: 480px;
      // height: 400px;
      // background: red;

      display: flex;
      flex-direction: column;
      gap: 24px;

      .login-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        // background-color: yellow;
        .title {
          font-size: 36px;
          font-weight: 500;
          height: 36px;
          line-height: 36px;
          width: fit-content;
        }
      }

      .login-contents {
        width: 100%;
        // background-color: green;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .input-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        // 계정 정보 저장 및 비밀번호 찾기
        .manage-account {
          display: flex;
          justify-content: space-between;
        }

        .submit-login {
          width: 100%;
        }
      }

      .login-footer {
        width: 100%;
        display: flex;
        // justify-content: flex-end;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
