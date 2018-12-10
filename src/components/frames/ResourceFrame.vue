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
                    <input v-model="name">
                </div>
                <div>类型：
                    <input v-model="cls">
                </div>
                <div>总量：
                    <input v-model="total">
                </div>
                <div>余量：
                    <input v-model="available">
                </div>
                <div>单位：
                    <input v-model="userID">
                </div>
            </md-card-content>
                <md-card-actions>
                <md-button class="md-primary left">添加</md-button>
                </md-card-actions>
		</md-card>
        </div>

        <md-card v-for="(resource, idx) in resources" v-bind:key="idx" class="member">
            <md-card-header>
                <div class="md-title inline">{{resource.name}}</div>
                <div class="md-title inline-right">{{resource.class}}</div>
                <div>
                        创建于
                        <div class="inline darkgray">{{resource.createDatatune}}</div>
                    </div>
            <md-divider/>
            </md-card-header>
            
            <md-card-content>
                <div>总量：{{resource.total}} {{resource.unit}}</div>
                <div>可用：{{resource.available}} {{resource.unit}}</div>
            </md-card-content>
            
            <md-card-actions>
                <md-button class="md-accent">删除</md-button>
                <md-button class="md-primary">修改</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
    export default {
        name: "ResourcePage", 
        data() {
            return {
                resources: [{
                    name: 'A1教学楼',
                    class: '场地', 
                    total: 100, 
                    available: 80, 
                    unit: '间',
                    createDatatune: '13:23, July 17, 2018'
                }, {
                    name: 'A2教学楼',
                    class: '场地', 
                    total: 100, 
                    available: 100, 
                    unit: '间',
                    createDatatune: '22:57, July 21, 2018'
                }, {
                    name: 'A3教学楼',
                    class: '场地', 
                    total: 100, 
                    available: 30, 
                    unit: '间',
                    createDatatune: '23:46, July 21, 2018'
                }],

                name: '',
                cls: '', 
                total: 0, 
                available: 0, 
                unit: '',
                btnText: '添加资源',
                isShow: false
            }
        },
        methods: {
            showToggle:function(){
				this.isShow = !this.isShow
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


</style>