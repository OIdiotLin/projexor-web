<template>
    <div>
        <md-dialog-confirm :md-active.sync="deleting"
                           md-title="删除任务？"
                           md-content="确认要删除此任务吗？这将无法撤回。"
                           md-confirm-text="确认删除"
                           md-cancel-text="取消"
                           @md-confirm="deleteTask(deletingIdx)"/>
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
                        <md-datepicker v-model="add_data.end_time" md-immediately/>
                    </div>
                    <div>任务描述：
                        <textarea class="description" v-model="add_data.description"></textarea>
                    </div>
                    <div>关系人：
                        <div>
                            <div v-for="(v,i) in add_data.users" v-bind:key="i">
                                <button v-if="i>0" @click="removeBlank(-1,i)">-</button>
                                <input v-model="add_data.users[i]">
                                <button @click="addBlank(-1)">+</button>
                            </div>
                        </div>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button class="md-primary" v-on:click="addTask" @click.prevent>创建</md-button>
                </md-card-actions>
            </md-card>
        </div>

        <md-card v-for="(task, idx) in tasks" v-bind:key="idx" class="task">
            <div v-if="modify!==idx">
                <md-card-header>
                    <div>
                        <div class="md-title inline">{{task.name}}</div>
                        <!-- <div class="md-title inline darkgray" style="margin-left: 10px;">#{{task.id}}</div> -->
                        <div v-if="task.state!=='R'" class="md-title inline-right">
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
            <div v-if="modify===idx">
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
                    <div>
                        <md-switch v-model="modify_state" class="md-primary" @change="toggleState">
                            {{modify_data.state==='F'?"已经":"尚未"}}完成
                        </md-switch>
                    </div>
                </md-card-content>
            </div>

            <md-card-actions>
                <md-button v-if="modify!==idx" class="md-accent" v-on:click="deletingTask(idx)" @click.prevent>删除
                </md-button>
                <md-button v-if="modify!==idx" class="md-primary" v-on:click="updatingTask(idx)">修改</md-button>
                <md-button v-if="modify===idx" class="md-accent" v-on:click="quit">放弃修改</md-button>
                <md-button v-if="modify===idx" class="md-primary" v-on:click="updateTask(idx)" @click.prevent>确认修改
                </md-button>
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
        name: "TaskFrame",
        data() {
            return {
                modify: -1,
                tasks: null,
                btnText: '新建任务',
                isShow: false,
                deleting: false,
                deletingIdx: -1,

                users: null,

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
                    state: 'R',
                    users: [],
                }
            }
        },
        computed: {
            modify_state: function () {
                return this.modify_data.state === 'F';
            }
        },
        props: {
            projectId: null
        },
        mounted() {
            this.getTasks();
            this.getUsers();
        },
        methods: {
            toggleState: function () {
                if (this.modify_data.state === 'F')
                    this.modify_data.state = 'R';
                else
                    this.modify_data.state = 'F';
            },
            getTasks: function () {
                axios.get(api.task(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project_id': this.projectId}
                }).then((response) => {
                    this.tasks = response.data
                })
            },

            getUsers: function () {
                axios.get(api.user(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project__id': this.projectId}
                }).then((response) => {
                    this.users = response.data;
                })
            },

            addTask: function () {
                var users_id = this.users.filter((x) => this.add_data.users.includes(x.username));
                console.log(this.projectId);
                axios.post(api.task(), {
                        project_id: this.projectId,
                        users: users_id,
                        name: this.add_data.name,
                        description: this.add_data.description,
                        state: 'R',
                    }, {headers: {'Authorization': this.$cookies.get('JWT')}}
                ).then((response) => {
                    console.log(response);
                    this.showToggle();
                    this.getTasks();
                })
            },

            deletingTask: function (idx) {
                this.deleting = true;
                this.deletingIdx = idx;
            },

            deleteTask: function (idx) {
                // console.log(idx);
                let task_id = this.tasks[idx].id;
                axios.delete(api.task(task_id), {
                    headers: {'Authorization': this.$cookies.get('JWT')}
                }).then(() => {
                    this.created();
                })
            },

            updatingTask: function (idx) {
                this.modify = idx;
                this.modify_data.name = this.tasks[idx].name.concat();
                this.modify_data.description = this.tasks[idx].description.concat();
                this.modify_data.end_time = this.tasks[idx].end_time.concat();
                this.modify_data.users = this.tasks[idx].users.concat();
                this.modify_data.state = this.tasks[idx].state.concat();
                console.log(this.modify_data.users)
            },

            // TODO users字段使用:
            /**
             * "users": [
             *      {"id": "xxxxxx"},
             *      {"id": "xxxxxx"},
             *      {"id": "xxxxxx"},
             * ]
             **/
            updateTask: function (idx) {
                let task_id = this.tasks[idx].id;
                for (const user of this.modify_data.users.values())
                    console.log(user);
                axios.put(api.task(task_id), {
                        id: task_id,
                        name: this.modify_data.name,
                        description: this.modify_data.description,
                        end_time: this.modify_data.end_time,
                        state: this.modify_data.state
                    }, {headers: {'Authorization': this.$cookies.get('JWT')}}
                ).then(() => {
                    this.created();
                    this.quit();
                })
            },

            showToggle: function () {
                this.isShow = !this.isShow;
                this.modify = -1
            },

            addBlank: function (idx) {
                if (idx > -1) {
                    this.modify_data.users.push('')
                }
                else {
                    this.add_data.users.push('')
                }
            },

            removeBlank: function (idx, i) {
                if (idx > -1) {
                    this.modify_data.users.splice(i, 1)
                }
                else {
                    this.add_data.users.splice(i, 1)
                }
                // this.stakeholders.splice(i, 1)
            },

            created(pid) {
                this.tasks = null;
                this.projectId = pid;
                this.getTasks()
            },

            quit: function () {
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