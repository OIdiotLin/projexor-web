<template>
    <div>

        <div>
            <md-button class='left' v-text="btnText" @click="showToggle"></md-button>
            <md-card v-show="isShow" class="member">
                <md-card-header>
                    <div class="md-title inline add">添加资源</div>
                    <md-divider/>
                </md-card-header>
                <md-card-content>
                    <div>资源：
                        <input class="wid" v-model="add_data.name">
                    </div>
                    <div>描述：
                        <textarea class="description" v-model="add_data.description"></textarea>
                    </div>
                    <div>总量：
                        <input class="wid" v-model="add_data.total">
                    </div>
                    <div>余量：
                        <input class="wid" v-model="add_data.remainder">
                    </div>
                    <div>单位：
                        <input class="wid" v-model="add_data.unit">
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button class="md-primary left" v-on:click="addResource">添加</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="success"
                         :md-duration="6000" md-persistent>
                <span>操作成功！</span>
            </md-snackbar>
        </div>

        <md-dialog-confirm :md-active.sync="deleting"
                           md-title="删除资源？"
                           md-content="确认要删除此资源吗？这将无法撤回。"
                           md-confirm-text="确认删除"
                           md-cancel-text="取消"
                           @md-confirm="deleteResource(deletingIdx)"/>

        <md-card v-for="(resource, idx) in resources" v-bind:key="idx" class="member">
            <md-card-header>
                <div class="md-title inline">{{resource.name}}</div>
                <div class="md-title inline-right">{{resource.class}}</div>
                <!-- <div>
                        创建于
                        <div class="inline darkgray">{{resource.createDatatune}}</div>
                    </div> -->
                <md-divider/>
            </md-card-header>

            <md-card-content v-if="modify!=idx">
                <div>描述：{{resource.description}}</div>
                <div>总量：{{resource.total}} {{resource.unit}}</div>
                <div>可用：{{resource.remainder}} {{resource.unit}}</div>
            </md-card-content>

            <md-card-content v-if="modify==idx">
                <div>资源：
                    <input class="wid" v-model="modify_data.name">
                </div>
                <div>描述：
                    <textarea class="description" v-model="modify_data.description"></textarea>
                </div>
                <div>总量：
                    <input class="wid" v-model="modify_data.total">
                </div>
                <div>余量：
                    <input class="wid" v-model="modify_data.remainder">
                </div>
                <div>单位：
                    <input class="wid" v-model="modify_data.unit">
                </div>
            </md-card-content>

            <md-card-actions>
                <md-button v-if="modify!=idx" class="md-accent" v-on:click="deletingResource(idx)">删除</md-button>
                <md-button v-if="modify!=idx" class="md-primary" v-on:click="updatingResource(idx)">修改</md-button>
                <md-button v-if="modify==idx" class="md-accent" v-on:click="quit">放弃修改</md-button>
                <md-button v-if="modify==idx" class="md-primary" v-on:click="updateResource(idx)">确认修改</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from '../../script/apis';
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    export default {
        name: "ResourcePage",
        data() {
            return {
                resources: null,

                btnText: '添加资源',
                isShow: false,
                modify: -1,
                deletingIdx: -1,
                add_data: {
                    name: '',
                    total: 0,
                    remainder: 0,
                    unit: '',
                },
                modify_data: {
                    name: '',
                    total: 0,
                    remainder: 0,
                    unit: '',
                },
                success: false,
                deleting: false
            }
        },
        props: {
            projectId: null
        },
        mounted() {
            this.resources = null
            this.getResources()
        },
        methods: {
            getResources: function () {
                axios.get(api.resource(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project_id': this.projectId}
                })
                    .then((response) => {
                        console.log(response.data)
                        this.resources = response.data
                    })
            },

            showToggle: function () {
                this.isShow = !this.isShow
            },

            created(pid) {
                this.projectId = pid;
                this.getResources()
            },

            addResource: function () {
                axios.post(api.resource(), {
                        name: this.add_data.name,
                        description: this.add_data.description,
                        unit: this.add_data.unit,
                        total: this.add_data.total,
                        remainder: this.add_data.available,
                        // isConsumble: true,
                        project_id: this.projectId,
                    }, {headers: {'Authorization': this.$cookies.get('JWT')},}
                ).then((response) => {
                    console.log(response.data);
                    this.success = true;
                    this.resources = null;
                    this.showToggle();
                    this.getResources();

                }).catch((error) => {
                    console.log(error);
                    // alert("添加失败");
                })
            },

            deletingResource: function (idx) {
                this.deletingIdx = idx;
                this.deleting = true;
            },

            deleteResource: function (idx) {
                axios.delete(api.resource(this.resources[idx].id), {
                    'headers': {'Authorization': this.$cookies.get('JWT')}
                }).then(() => {
                    this.success = true;
                    this.resources = null;
                    this.getResources();
                })
            },

            updatingResource: function (idx) {
                this.modify = idx;
                this.modify_data.name = this.resources[idx].name.concat()
                this.modify_data.description = this.resources[idx].description.concat()
                this.modify_data.unit = this.resources[idx].unit.concat()
                this.modify_data.total = this.resources[idx].total
                this.modify_data.remainder = this.resources[idx].remainder
            },

            updateResource: function (idx) {
                let resource_id = this.resources[idx].id;
                axios.put(api.resource(resource_id), {
                        id: resource_id,
                        name: this.modify_data.name,
                        description: this.modify_data.description,
                        unit: this.modify_data.unit,
                        remainder: this.modify_data.remainder,
                        total: this.modify_data.total
                    }, {headers: {'Authorization': this.$cookies.get('JWT')}}
                ).then(() => {
                    this.quit();
                    this.success = true;
                    this.resources = null;
                    this.getResources();
                })
            },

            quit: function () {
                this.modify = -1
            }
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

    .add {
        color: rgba(255, 0, 0, 0.658);
    }

    .description {
        width: 100%;
        height: 100px;
        overflow: auto;
        word-break: break-all;
    }

    .wid {
        width: 100%
    }


</style>