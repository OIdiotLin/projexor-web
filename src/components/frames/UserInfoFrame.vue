<template>
    <div>
        <md-card class="info">
            <md-card-header>
                <div class="md-title inline">用户个人信息</div>
                <!-- <div>
                        创建于
                        <div class="inline darkgray">{{resource.createDatatune}}</div>
                    </div> -->
                <md-divider/>
            </md-card-header>

            <md-card-content v-if="!modify">
                <div>用户名：{{info.username}}</div>
                <div>邮箱：{{info.email}}</div>
            </md-card-content>

            <md-card-content v-if="modify">
                <div>用户名：<input v-model="modify_data.username"></div>
                <div>邮箱：<input v-model="modify_data.email"></div>
            </md-card-content>

            <md-card-actions>
                <md-button v-if="!modify" class="md-primary" v-on:click="modifyInfo">修改个人信息</md-button>
                <md-button v-if="modify" class="md-accent" v-on:click="quit">放弃修改</md-button>
                <md-button v-if="modify" class="md-primary">确认修改</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>
<script>
    import axios from 'axios'
    import {api} from '../../script/apis';
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies);

    export default {
        name: "ResourcePage",
        data() {
            return {
                info: null,

                btnText: '添加资源',
                isShow: false,
                modify: false,
                modify_data: {
                    username: null,
                    emial: null,
                }
            }
        },
        props: {
            user_id: null
        },
        mounted() {
            this.info = null;
            this.getInfo()
        },
        methods: {
            getInfo: function () {
                axios.get(api.user(this.addingUsername), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    // params: {'id': this.user_id}
                }).then((response) => {
                    this.info = response.data[0]
                })
            },

            modifyInfo: function () {
                this.modify = true;
                this.modify_data.username = this.info.username.concat();
                this.modify_data.email = this.info.email.concat()
            },
            quit: function () {
                this.modify = false
            }
        }
    }
</script>

<style scoped>
    .info {
        position: relative;
        margin: 30px auto;
        max-width: 800px;
        min-width: 550px;
    }

    .darkgray {
        color: darkgray;
    }

    .pm {
        color: rgba(0, 128, 43, 0.658);
    }

    .padding-15 {
        padding: 15px;
    }

    .emphasize {
        font-weight: bold;
    }

    .inline {
        display: inline;
    }

    .inline-right {
        display: inline;
        float: right;
    }

</style>