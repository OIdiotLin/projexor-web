<template>
    <div id="container" ref="container">
        <div id="description">
            <img src="../assets/logo.png"/>
            <div style="font-size: xx-large; margin-top: 10px">超轻的小型项目管理工具</div>
        </div>
        <div id="user-panel" class="shadow">
            <md-progress-bar md-mode="indeterminate" v-if="sending"/>
            <form novalidate v-if="loginStage" ref="login-form" class="md-layout" @submit.prevent="login" method="post">
                <md-card class="md-layout-item">
                    <md-card-header>
                        <div class="md-title">登录</div>
                    </md-card-header>

                    <md-card-content>
                        <md-field>
                            <label for="account">用户名/电子邮箱</label>
                            <md-input name="account" id="account" v-model="loginForm.account"></md-input>
                            <span class="md-error" v-if="!$v.loginForm.account.required">请输入账户名或电子邮箱</span>
                        </md-field>

                        <md-field>
                            <label for="password">密码</label>
                            <md-input name="password" id="password" v-model="loginForm.password"
                                      type="password"></md-input>
                            <span class="md-error" v-if="!$v.loginForm.password.required">请输入密码</span>
                        </md-field>

                    </md-card-content>

                    <md-card-actions>
                        <md-button class="md-primary" :disabled="sending" v-on:click="loginStage=false">注册新用户
                        </md-button>
                        <md-button type="submit" class="md-primary" :disabled="sending" @click="login" @click.prevent>登录
                        </md-button>
                    </md-card-actions>

                    <md-snackbar :md-active.sync="loginSuccess"
                                 :md-duration="4000" md-persistent>
                        <span>登录成功！</span>
                    </md-snackbar>
                </md-card>
            </form>

            <form novalidate v-if="!loginStage" ref="login-form" class="md-layout" @submit.prevent="login"
                  method="post">
                <md-card class="md-layout-item">
                    <md-card-header>
                        <div class="md-title">注册新用户</div>
                    </md-card-header>

                    <md-card-content>
                        <md-field>
                            <label for="username">用户名</label>
                            <md-input name="username" id="username" v-model="registForm.username"></md-input>
                            <span class="md-error" v-if="!$v.registForm.username.required">请输入用户名</span>
                        </md-field>

                        <md-field>
                            <label for="email">电子邮箱</label>
                            <md-input name="email" id="email" v-model="registForm.email"></md-input>
                            <span class="md-error" v-if="!$v.registForm.email.email">请输入合法邮箱地址</span>
                            <span class="md-error" v-if="!$v.registForm.email.required">请输入邮箱地址</span>
                        </md-field>

                        <md-field>
                            <label>密码</label>
                            <md-input name="password" v-model="registForm.password"
                                      type="password"></md-input>
                            <span class="md-error" v-if="!$v.registForm.password.required">请输入密码</span>
                        </md-field>

                    </md-card-content>

                    <md-card-actions>
                        <md-button class="md-primary" :disabled="sending" v-on:click="loginStage=true">我已有账户</md-button>
                        <md-button type="submit" class="md-primary" :disabled="sending">注册
                        </md-button>
                    </md-card-actions>

                    <md-snackbar :md-active.sync="loginSuccess"
                                 :md-duration="4000" md-persistent>
                        <span>登录成功！</span>
                    </md-snackbar>
                </md-card>
            </form>
        </div>
    </div>
</template>

<script>
    // import Vue from 'vue';
    import axios from 'axios';
    import {validationMixin} from 'vuelidate';
    import {required, email} from 'vuelidate/lib/validators';
    import {api} from '../script/apis'

    import 'vue-material/dist/vue-material.min.css'

    // Vue.use(axios);

    export default {
        name: "HomePage",
        mixins: [validationMixin],
        data() {
            return {
                user: null,
                token: null,
                loginStage: true,
                loginForm: {
                    account: null,
                    password: null
                },
                registForm: {
                    username: null,
                    email: null,
                    password: null,
                },
                sending: false,
                loginSuccess: false,
            }
        },
        // TODO : 完成表单的 validation
        validations: {
            loginForm: {
                account: {
                    required,
                },
                password: {
                    required,
                }
            },
            registForm: {
                username: {
                    required,
                },
                password: {
                    required,
                },
                email: {
                    required,
                    email,
                }
            }
        },
        methods: {
            // login: function () {
            //     this.sending = true;
            //     setTimeout(() => {
            //         this.sending = false;
            //         this.loginSuccess = true;

            //         if (this.loginSuccess) {
            //             console.log('emit to listenToGoToPageEvent');
            //             this.$emit('listenToGoToPageEvent', 1);
            //         }
            //     }, 1500);
            //     // this.loginSuccess = false;
            // }
            login: function () {
                this.account = document.getElementById("account").value
                this.password = document.getElementById("password").value

                axios.post(api.login, {
                    username: this.account,
                    password: this.password
                })
                .then((response) => {
                    this.user = response.data.user
                    this.token = response.data.token
                    console.log(this.user.id)
                    console.log('user ' + this.user.id + ' login success!\nemit to listenToGetProjectsEvent')
                    setTimeout(() => {
                        this.$emit('listenToGetProjectsEvent', this.user.id, this.token)
                    }, 1500)
                    // this.$emit('listenToGoToPageEvent', 1)
                })
                .catch(function (error) {
                    console.log(error)
                    console.log('login unsuccess!')
                    alert('登录失败')
                }) 
                
            }
        }
    }
</script>

<style scoped>
    form {
        width: 100%;
    }

    #container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), gray url("../assets/login-bg.jpg");
        background-size: 100%;
        text-align: center;
    }

    #description {
        margin: 40px auto;
        width: fit-content;
        text-align: center;
        color: white;
    }

    #user-panel {
        margin: 0 auto;
        width: 400px;
        background: white;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        /*border-radius: 10px;*/
    }

    .shadow {
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
        box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
    }

    .padding-20 {
        padding: 20px;
    }

</style>