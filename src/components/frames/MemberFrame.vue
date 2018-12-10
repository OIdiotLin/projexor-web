<template>
    <div><div>
		<md-button class='left' v-text="btnText" @click="showToggle"></md-button>
		<md-card v-show="isShow" class="member">
            <md-card-header>
                <div class="md-title inline add">添加新成员</div>
            <md-divider/>
            </md-card-header>
            <md-card-content>
                <div>成员ID：
                    <input v-model="userID">
                </div>
                <div>职责：
                    <div>
                    <div v-for="(v,i) in job_list" v-bind:key="i">
                        <button v-if="i>0" @click="removeBlank(i)">-</button>
                        <input v-model="job_list[i]">
                        <button  @click="addBlank">+</button></div>
                    </div>
                </div>
            </md-card-content>
                <md-card-actions>
                <md-button class="md-primary">添加</md-button>
                </md-card-actions>
		</md-card>
        </div>
        <md-card v-for="(member, idx) in members" v-bind:key="idx" class="member">
            <md-card-header>
                <div v-if="member.pm" class="md-title inline pm">{{member.name}}</div>
                <div v-else class="md-title inline">{{member.name}}</div>
                <div v-if="member.pm" class="md-title inline-right pm">
                        PM
                    </div>
                <div>
                        加入于
                        <div class="inline darkgray">{{member.joinDatatune}}</div>
                    </div>
            <md-divider/>
            </md-card-header>
            
            <md-card-content>
                <div>职责：<a href="#" class="emphasize" style="margin-right: 4px;"
                            v-for="(name,idx) in member.position"
                            v-bind:key="idx">{{name}}</a></div>
                <!-- <div>当前任务：<a href="#" class="emphasize" style="margin-right: 4px;"
                            v-for="(name,idx) in member.tasks"
                            v-bind:key="idx">{{name}}</a></div> -->
                <div>当前任务：<div class="emphasize" style="margin-right: 4px;"
                            v-for="(name,idx) in member.tasks"
                            v-bind:key="idx">  {{idx+1}}. <a href="#">{{member.tasks[idx]}}</a><br/>截止时间: {{member.endDatetime[idx]}}</div></div>
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
        name: "MemberFrame", 
        data() {
            return {
                members: [{
                    name: '宗文智',
                    pm: true,
                    position: ['项目经理', '架构设计'],
                    tasks: ['UI原型设计'],
                    endDatetime: ['23:46, October 21, 2018'], 
                    joinDatatune: '13:23, July 17, 2018'
                }, {
                    name: '黄文禹',
                    pm: false,
                    position: ['前端开发', '架构设计'],
                    tasks: ['系统概要设计'],
                    endDatetime: ['23:46, October 21, 2018'], 
                    joinDatatune: '22:57, July 21, 2018'
                }, {
                    name: '林会东',
                    pm: false,
                    position: ['前端开发', '后台设计'],
                    tasks: ['UI原型设计', '系统概要设计'],
                    endDatetime: ['23:46, October 21, 2018', '23:46, October 21, 2018'], 
                    joinDatatune: '23:46, July 21, 2018'
                }],
                btnText:"添加",
                isShow:false,
                job_list: [''],
                userID: ''
            }
        },
        methods: {
            showToggle:function(){
				this.isShow = !this.isShow
				// if(this.isShow){
				// 	this.btnText = "隐藏"
				// }else{
				// 	this.btnText = "显示"
				// }
			},

            addBlank:function(){
                this.job_list.push('')
            },

            removeBlank:function(i){
                this.job_list.splice(i, 1)
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