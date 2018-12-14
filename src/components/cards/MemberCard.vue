<template>
    <div>
    <md-card-header>
                <div v-if="member.is_superuser" class="md-title inline pm">{{member.username}}</div>
                <div v-else class="md-title inline">{{member.username}}</div>
                <div v-if="member.is_superuser" class="md-title inline-right pm">
                        superuser
                    </div>
                <div>
                        加入于
                        <div class="inline darkgray">{{member.date_joined}}</div>
                    </div>
            <md-divider/>
            </md-card-header>
            
            <md-card-content>
                <div>email：<a href="#" class="emphasize" style="margin-right: 4px;">
                            {{member.email}}</a></div>
                <div>当前任务：<div class="emphasize" style="margin-right: 4px;"
                            v-for="(task,i) in tasks"
                            v-bind:key="i">  {{i+1}}. <a href="#">{{task.name}}</a><br/>截止时间: {{task.end_time}}</div></div>
            </md-card-content>
            
        <md-card-actions>
            <md-button class="md-accent">删除</md-button>
        </md-card-actions>
    
    </div>
</template>


<script>
    import axios from 'axios'
    import { api } from '../../script/apis'
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    export default {
        name: "MemberCard", 
        props: {
            member: null,
        },
        mounted() {
            this.getTasks()
        },
        data() {
            return {
                tasks: null
            }
        },
        methods: {
            getTasks:function() {
                axios.get(api.task_get, {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'users__id': this.member.id}
                })
                .then ((response) => {
                    this.tasks = response.data
                })
            },
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
</style>