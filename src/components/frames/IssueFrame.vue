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
                    <a href="#" class="inline emphasize">{{issue.user.username}}</a> 
                    发表于 
                    <div class="inline darkgray">{{issue.time}}</div>
                </div>
            <md-divider/>
            </md-card-header>
            <md-card-content>
                {{issue.content}}
            </md-card-content>
            <reply-card v-bind:issue="issue"></reply-card>
            <md-card v-if="modify==idx" class="reply">
                <md-card-header>
                <div class="md-title inline">回复内容</div>
                <md-divider/>
                </md-card-header>
                <textarea class="addrep" v-model="pre_reply"/>
            <md-card-actions>
                <md-button class="md-accent" v-on:click="quit">放弃编辑</md-button>
                <md-button class="md-primary">确认回复</md-button>
            </md-card-actions>
            </md-card>
            <md-card-actions>
                <md-button v-if="modify!=idx"  class="md-primary" v-on:click="createReply(idx)">回复</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import { api } from '../../script/apis';
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    import ReplyCard from '../cards/ReplyCard'

    Vue.use(VueCookies)

    export default {
        name: "IssueFrame",
        data() {
            return {
                issues: null,
                btnText: '发帖',
                isShow: false,
                pre_reply: '',
                modify: -1
            }
        },
        props: {
            projectId: null
        },
        mounted() {
            this.getIssues()
        },
        methods: {
            showToggle:function(){
                this.isShow = !this.isShow
            },
            getIssues:function(){
                axios.get(api.issue_get, {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'project_id': this.projectId}
                })
                .then((response) => {
                    this.issues = response.data 
                    console.log(this.issues)
                })
            },
            created:function(pid){
                this.issues = null
                this.projectId = pid
                this.getIssues()
            },
            createReply:function(idx) {
                this.modify = idx
            },
            quit:function() {
                this.modify = -1
            }
        },
        components: {
            ReplyCard
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
    .addrep {
        width: 95%;
        height: 100px;
        overflow: auto;
        word-break: break-all;
        margin: 15px;
    }

</style>