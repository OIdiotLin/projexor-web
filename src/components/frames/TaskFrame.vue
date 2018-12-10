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
                    <input v-model="title">
                </div>
                <div>任务截止日期：
                    <input v-model="endDatetime">
                </div>
                <div>任务描述：
                    <input v-model="content">
                </div>
                <div>关系人：
                    <div>
                    <div v-for="(v,i) in stakeholders" v-bind:key="i">
                        <button v-if="i>0" @click="removeBlank(i)">-</button>
                        <input v-model="stakeholders[i]">
                        <button  @click="addBlank">+</button></div>
                    </div>
                </div>
            </md-card-content>
                <md-card-actions>
                <md-button class="md-primary">创建</md-button>
                </md-card-actions>
		</md-card>
        </div>

        <md-card v-for="(task, idx) in tasks" v-bind:key="idx" class="task">
            <md-card-header>
                <div>
                    <div class="md-title inline">{{task.title}}</div>
                    <div class="md-title inline darkgray" style="margin-left: 10px;">#{{task.id}}</div>
                    <div v-if="task.finished" class="md-title inline-right">
                        <md-icon class="md-size-2x" style="color: limegreen;">check_circle</md-icon>
                    </div>
                    <div>
                        <a href="#" class="inline emphasize">{{task.issuer}}</a>
                        创建于
                        <div class="inline darkgray">{{task.startDatetime}}</div>
                        {{task.finished ? '': '预计'}}完成于
                        <div class="inline darkgray">{{task.endDatetime}}</div>
                    </div>
                    <md-divider/>
                </div>
            </md-card-header>
            <md-card-content>
                <div>干系人：<a href="#" class="emphasize" style="margin-right: 4px;"
                            v-for="(name,idx) in task.stakeholders"
                            v-bind:key="idx">{{name}}</a></div>

                {{task.description}}
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
        name: "TaskFrame",
        data() {
            return {
                tasks: [{
                    title: 'UI原型设计',
                    finished: false,
                    id: 3,
                    issuer: '宗文智',
                    stakeholders: ['宗文智', '林会东'],
                    startDatetime: '19:25, October 21, 2018',
                    endDatetime: '23:46, October 21, 2018',
                    description: '与之相应，UI设计师的职能大体包括三方面：一是图形设计，软件产品的产品“外形”设计。二是交互设计，主要在于设计软件的操作流程、树状结构、操作规范等。一个软件产品在编码之前需要做的就是交互设计，并且确立交互模型，交互规范。三是用户测试/研究，这里所谓的“测试”，其目标恰在于测试交互设计的合理性及图形设计的美观性，主要通过以目标用户问卷的形式衡量UI设计的合理性。如果没有这方面的测试研究，UI设计的好坏只能凭借设计师的经验或者领导的审美来评判，这样就会给企业带来极大的风险。',
                }, {
                    title: '系统概要设计',
                    finished: true,
                    id: 2,
                    issuer: '宗文智',
                    stakeholders: ['黄文禹', '林会东'],
                    startDatetime: '19:25, October 21, 2018',
                    endDatetime: '23:46, October 21, 2018',
                    description: '概要设计是一个设计师根据用户交互过程和用户需求来形成交互框架和视觉框架的过程，其结果往往以反映交互控件布置、界面元素分组以及界面整体板式的页面框架图的形式来呈现。',
                }, {
                    title: '数据库设计',
                    finished: false,
                    id: 1,
                    issuer: '宗文智',
                    stakeholders: ['于竞超'],
                    startDatetime: '19:25, October 21, 2018',
                    endDatetime: '22:00, October 21, 2018',
                    description: '数据库设计是指对于一个给定的应用环境，构造最优的数据库模式，建立数据库及其应用系统，使之能够有效地存储数据，满足各种用户的应用需求（信息要求和处理要求）。在数据库领域内，常常把使用数据库的各类系统统称为数据库应用系统。',
                }],
                btnText: '新建任务',
                isShow: false,
                title: '',
                content: '',
                endDatetime: '',
                stakeholders: ['']
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
                this.stakeholders.push('')
            },

            removeBlank:function(i){
                this.stakeholders.splice(i, 1)
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
</style>