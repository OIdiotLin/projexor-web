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
                <md-button class="md-primary left" v-on:click="addResources">添加</md-button>
                </md-card-actions>
		</md-card>
        </div>

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
                <md-button v-if="modify!=idx" class="md-accent">删除</md-button>
                <md-button v-if="modify!=idx" class="md-primary" v-on:click="modifyResource(idx)">修改</md-button>
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
        name: "ResourcePage", 
        data() {
            return {
                resources: null,
                
                btnText: '添加资源',
                isShow: false,
                modify: -1,
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
                }
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
            getResources:function() {
                axios.get(api.resource(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project_id': this.projectId}
                })
                .then ((response) => {
                    console.log(response.data)
                    this.resources = response.data
                })
            },

            showToggle:function(){
				this.isShow = !this.isShow
            },

            created(pid) {
                this.projectId = pid
                this.getResources()
            },

            addResources:function() {
                // axios.get(api.member, {
                //     headers: {'Authorization': this.$cookies.get('JWT')},
                //     params: {'id': this.projectId}
                // })
                // .then((response) => {
                //     var project = response.data[0]
                    // console.log(response.data[0])
                    axios.post(api.resource, {
                        name: this.add_data.name,
                        description: this.add_data.description,
                        unit: this.add_data.unit,
                        total: this.add_data.total,
                        remainder: this.add_data.available,
                        isConsumble: true,
                        project: this.projectId,
                        }, {
                        headers: {'Authorization': this.$cookies.get('JWT')},
                    })
                    .then ((response) => {
                        console.log(response.data)
                        alert("添加成功")
                    })
                    .catch ((error) => {
                        console.log(error)
                        alert("添加失败")
                    })
                // })
            },

            modifyResource:function(idx){
                this.modify = idx
                this.modify_data.name = this.resources[idx].name.concat()
                this.modify_data.description = this.resources[idx].description.concat()
                this.modify_data.unit = this.resources[idx].unit.concat()
                this.modify_data.total = this.resources[idx].total
                this.modify_data.remainder = this.resources[idx].remainder
            },
            quit:function(){
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