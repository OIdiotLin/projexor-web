<template>
    <div>
        <div>
            <md-snackbar :md-active.sync="success"
                         :md-duration="6000" md-persistent>
                <span>操作成功！</span>
            </md-snackbar>
            <md-button class='left' v-text="btnText" @click="showToggle"></md-button>
            <md-card v-show="isShow" class="member">
                <md-card-header>
                    <div class="md-title inline add">添加新成员</div>
                    <md-divider/>
                </md-card-header>
                <md-card-content>
                    <div>成员ID：
                        <input class="wid" v-model="addingUsername">
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button class="md-primary" v-on:click="addMember">添加</md-button>
                </md-card-actions>
            </md-card>
        </div>
        <md-card v-for="(member, idx) in members" v-bind:key="idx" class="member">
            <member-card v-bind:member="member"></member-card>
        </md-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from '../../script/apis';
    import MemberCard from '../cards/MemberCard'
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    export default {
        name: "MemberFrame",
        data() {
            return {
                members: null,
                tasks: new Array(),
                btnText: "添加",
                isShow: false,
                job_list: [''],
                addingUsername: '',
                addingUserId: null,
                info: null,
                success: false
            }
        },
        props: {
            projectId: null
        },
        mounted() {
            this.getMembers()
        },
        methods: {
            getMembers: function () {
                axios.get(api.project(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {id: this.projectId}
                }).then((response) => {
                    this.members = response.data[0].users
                    for (var i = 0; i < this.members.length; i++) {
                        this.$ref.i.getTasks()
                    }
                })
            },

            addMember: function () {
                axios.get(api.user(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {username: this.addingUsername}
                }).then((response) => {
                    this.addingUserId = response.data[0].id;
                    console.log(this.addingUserId);
                    this.members.push({id: this.addingUserId});
                    axios.put(api.project(this.projectId), {
                            id: this.projectId,
                            users: this.members
                        }, {headers: {'Authorization': this.$cookies.get('JWT')}}
                    ).then(() => {
                        this.success = true;
                        this.members = null;
                        this.showToggle();
                        this.getMembers();
                    })
                }).catch(() => {
                    alert('添加失败');
                });
            },

            showToggle: function () {
                this.isShow = !this.isShow
            },

            addBlank: function () {
                this.job_list.push('')
            },

            removeBlank: function (i) {
                this.job_list.splice(i, 1)
            },
            created(pid) {
                this.members = null
                this.projectId = pid
                this.getMembers()
            },
        },
        components: {
            MemberCard
        }
    }
</script>

<style scoped>
    .member {
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

    .add {
        color: rgba(255, 0, 0, 0.658);
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

    .left {
        float: left;
    }

    .wid {
        width: 100%;
    }
</style>