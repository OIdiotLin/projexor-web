<template>
    <div>

        <div>
		<md-button class='left' v-text="btnText" @click="showToggle"></md-button>
		<md-card v-show="isShow" class="task">
            <md-card-header>
                <div class="md-title inline add">新建任务</div>
            <md-divider/>
            </md-card-header>
            <md-card-content>
                <div>任务名称：
                    <input class="wid" v-model="add_data.name">
                </div>
                <div>任务截止日期：
                    <input class="wid" v-model="add_data.end_time">
                </div>
                <div>任务描述：
                    <textarea class="description" v-model="add_data.description"></textarea>
                </div>
                <div>关系人：
                    <div>
                    <div v-for="(v,i) in add_data.users" v-bind:key="i">
                        <button v-if="i>0" @click="removeBlank(-1,i)">-</button>
                        <input v-model="add_data.users[i]">
                        <button  @click="addBlank(-1)">+</button></div>
                    </div>
                </div>
            </md-card-content>
                <md-card-actions>
                <md-button class="md-primary">创建</md-button>
                </md-card-actions>
		</md-card>
        </div>

        <md-card v-for="(task, idx) in tasks" v-bind:key="idx" class="task">
            <div v-if="modify!=idx">
            <md-card-header>
                <div>
                    <div class="md-title inline">{{task.name}}</div>
                    <!-- <div class="md-title inline darkgray" style="margin-left: 10px;">#{{task.id}}</div> -->
                    <div v-if="task.state!='R'" class="md-title inline-right">
                        <md-icon class="md-size-2x" style="color: limegreen;">check_circle</md-icon>
                    </div>
                    <div>
                        <!-- <a href="#" class="inline emphasize">{{task.users}}</a> -->
                        创建于
                        <div class="inline darkgray">{{task.begin_time}}</div>
                        {{task.finished ? '': '预计'}}完成于
                        <div class="inline darkgray">{{task.end_time}}</div>
                    </div>
                    <md-divider/>
                </div>
            </md-card-header>
            <md-card-content>
                <div>干系人：<a href="#" class="emphasize" style="margin-right: 4px;"
                            v-for="(user,idx) in task.users"
                            v-bind:key="idx">{{user.username}}</a></div>

                {{task.description}}
            </md-card-content>
            </div>
            <div v-if="modify==idx">
                <md-card-content>
                <div>任务名称：
                    <input class="wid" v-model="modify_data.name">
                </div>
                <div>任务截止日期：
                    <input class="wid" v-model="modify_data.end_time">
                </div>
                <div>任务描述：
                    <textarea class="description" v-model="modify_data.description"></textarea>
                </div>
                <div>关系人：
                    <div>
                    <div v-for="(user,i) in modify_data.users" v-bind:key="i">
                        <button @click="removeBlank(idx, i)">-</button>
                        <input v-model="user.username">
                        <button @click="addBlank(idx)">+</button></div> 
                    </div>
                </div>
                </md-card-content>
            </div>

            <md-card-actions>
                <md-button v-if="modify!=idx" class="md-accent">删除</md-button>
                <md-button v-if="modify!=idx" class="md-primary" v-on:click="modifyTask(idx)">修改</md-button>
                <md-button v-if="modify==idx" class="md-accent" v-on:click="quit">放弃修改</md-button>
                <md-button v-if="modify==idx" class="md-primary">确认修改</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import { api } from '../../script/apis';
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    export default {
        name: "TaskFrame",
        data() {
            return {
                modify: -1,
                tasks: null,
                btnText: '新建任务',
                isShow: false,
                add_data: {
                    name: '',
                    description: '',
                    end_time: '',
                    users: ['']
                },

                modify_data: {
                    name: '',
                    description: '',
                    end_time: '',
                    users: [],
                }
            }
        },
        props: {
            projectId: null
        },
        mounted() {
                this.getTasks()
        },
        methods: {
            getTasks:function() {
                axios.get(api.task_get, {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project_id': this.projectId}
                })
                .then ((response) => {
                    console.log(response.data)
                    this.tasks = response.data
                })
            },
            showToggle:function(){
				this.isShow = !this.isShow
				this.modify = -1
			},

            addBlank:function(idx){
                if (idx > -1) {
                    this.modify_data.users.push('')
                }
                else {
                    this.add_data.users.push('')
                }
            },

            removeBlank:function(idx, i){
                if (idx > -1) {
                    this.modify_data.users.splice(i, 1)
                }
                else {
                    this.add_data.users.splice(i, 1)
                }
                // this.stakeholders.splice(i, 1)
            },

            created(pid) {
                this.tasks = null
                this.projectId = pid
                this.getTasks()
            },
            
            addTask:function(){

            },

            modifyTask:function(idx){
                this.modify = idx
                this.modify_data.name = this.tasks[idx].name.concat()
                this.modify_data.description = this.tasks[idx].description.concat()
                this.modify_data.end_time = this.tasks[idx].end_time.concat()
                this.modify_data.users = this.tasks[idx].users.concat()
            },

            quit:function(){
                this.modify = -1
            }
            
        }
    }
</script>

<style scoped>
    .task {
        position: relative;
        margin: 30px auto;
        max-width: 800px;
        min-width: 550px;
    }

    .darkgray {
        color: darkgray;
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
    
    .add {
        color: rgba(255, 0, 0, 0.658);
    }

    .left {
        float: left;
    }
    
    .description {
        width: 100%;
        height: 180px;
        overflow: auto;
        word-break: break-all;
    }

    .wid {
        width: 100%
    }
</style>修改