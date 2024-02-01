<template>
    <div class="wrap">
        <div class="header">
            <!-- 헤더 -->
            <!-- logo-devchoiseojin -->
            <img
                alt="logo"
                src="~assets/logo-devchoiseojin.png"
                style="height: 40px"
             >       
        </div>
        <div class="content">
            <div class="login-wrap">
                <div class="login-header">
                    <div class="title">Login</div>
                    <div class="sub-title">Hi, Welcome back to <span :style="'color : #1B0182'">devchoiseojin</span> 👋</div>
                </div>
                <div class="login-contents">
                    <div class="input-wrap">
                        <!-- TODO: input-wrap 컴포넌트화 -->
                        <div>Email</div>
                        <q-input class="input-box" outlined v-model="text" dense placeholder="e.g. choiseojindev@gmail.com"/>
                    </div>

                    <div class="input-wrap">
                        <!-- TODO: input-wrap 컴포넌트화 -->
                        <div>Password</div>
                        <!-- <q-input outlined v-model="text"  dense placeholder="enter your password"/> -->
                         <q-input v-model="password" outlined :type="isPassword ? 'password' : 'text'"  dense placeholder="enter your password">
                            <template v-slot:append>
                            <q-icon
                                :name="isPassword ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPassword = !isPassword"
                            />
                            </template>
                        </q-input>
                    </div>

                    <div class="manage-account">
                        <q-checkbox class="remember" v-model="right" label="Remember Email?" />
                        <q-btn flat color="primary" label="Forgot Password?" />
                    </div>

                    <div class="submit-login">
                        <q-btn color="primary" label="Login" />
                    </div>

                </div>

                <div class="login-footer">
                    <span>Not registered yet?</span>
                    <q-btn flat color="primary" label="Create an account" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrap{
    width: 100vw;
    height: 100vh;

    .header {
        width: 100%;
        height: 80px;
        padding: 20px;
        border-bottom: 1px solid #EFEFF4; //TODO: color 변수화
        // background: blue;
    }

    .content{
        width: 100%;
        height: calc(100vh - 80px);
        // background: yellow;

        display: flex;
        justify-content: center;
        align-items: center;

        // 로그인
        .login-wrap{
            width:480px;
            height: 400px;
            // background: red;

            display: flex;
            flex-direction: column;
            gap: 24px;

            .login-header{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap:8px;
                // background-color: yellow;
                .title{
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

                .input-wrap{
                    .input-box{
                        width: 100%;
                        height: 48px;
                        // height: 44px;
                        border: 1px;
                        margin-bottom: 32px;
                    }
                }
            }

            .login-footer {
                width: 100%;
                // background-color : blue
            }

        }
    }
}
</style>