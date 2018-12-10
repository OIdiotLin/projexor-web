<template>
    <div>
        <md-button class='left' v-text="btnText" @click="showToggle"></md-button>
		<md-card v-show="isShow" class="issue">
            <md-card-header>
                <div class="md-title inline add">发表新帖</div>
            <md-divider/>
            </md-card-header>
            <md-card-content>
                <div class="title">
                    标题：
                    <md-input v-model="title"></md-input>
                </div>
                <div class="title">内容：
                    <md-input v-model="content"></md-input>
                </div>            
                
            </md-card-content>
                <md-card-actions>
                <md-button class="md-primary">发布</md-button>
                </md-card-actions>
		</md-card>

        <md-card v-for="(issue, idx) in issues" v-bind:key="idx" class="issue">
            <md-card-header>
                <div class="md-title inline">{{issue.title}}</div>
                <div v-if="issue.closed" class="md-title inline-right">
                        <md-icon class="md-size-2x" style="color: limegreen;">check_circle</md-icon>
                </div>
                <div>
                    <a href="#" class="inline emphasize">{{issue.username}}</a> 
                    发表于 
                    <div class="inline darkgray">{{issue.datetime}}</div>
                </div>
            <md-divider/>
            </md-card-header>
            <md-card-content>
                {{issue.content}}
            </md-card-content>
            <md-card v-for="(reply, idx) in issue.replies" v-bind:key="idx" class="reply">
                <md-divider/>
                <md-card-content>
                    {{reply.content}}
                    <div>
                    <a href="#" class="inline emphasize">{{reply.username}}</a> 
                    发表于 
                    <div class="inline darkgray">{{reply.datetime}}</div>
                    </div>
                </md-card-content>
            </md-card>
            <md-card-actions>
                <md-button v-if="!issue.closed" class="md-primary">回复</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>

    export default {
        name: "IssueFrame",
        data() {
            return {
                issues: [{
                    closed: false,
                    username: '黄文禹',
                    title: '什么时候开会？',
                    content: '什么时候开会？',
                    datetime: '23:46, October 21, 2018',
                    replies: [{
                        username: '林会东',
                        content: '今晚吧',
                        datetime: '23:49, October 21, 2018',
                    }, {
                        username: '宗文智',
                        content: '明晚吧',
                        datetime: '23:51, October 21, 2018',
                    }, {
                        username: '李榷基',
                        content: 'lmmnb！',
                        datetime: '23:53, October 21, 2018',
                    }, ]
                }, {
                    closed: false,
                    username: '宗文智',
                    title: 'vue怎么用？',
                    content: 'vue怎么用？\n急，在线等。',
                    datetime: '23:46, October 21, 2018'
                }, {
                    closed: true,
                    username: '李榷基',
                    title: '今晚吃什么？',
                    content: '今晚吃什么？',
                    datetime: '23:46, October 21, 2018'
                }, {
                    closed: true,
                    username: '于竞超',
                    title: '谁去拿外卖？',
                    content: '谁去拿外卖？',
                    datetime: '23:46, October 21, 2018'
                },],
                btnText: '发帖',
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
    .inline {
        display: inline;
    }

    .inline-right {
        display: inline;
        float: right;
    }

    .emphasize {
        font-weight: bold;
    }

    .darkgray {
        color: darkgray;
    }

    .padding-15 {
        padding: 15px;
    }

    .issue {
        position: relative;
        margin: 30px auto;
        max-width: 800px;
        min-width: 550px;
    }
    
    .reply {
        position: relative;
        margin: 30px auto;
        max-width: 700px;
        min-width: 500px;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .title {
        font-size: medium
    }

    .add {
        color: rgba(255, 0, 0, 0.658);
    }

</style>