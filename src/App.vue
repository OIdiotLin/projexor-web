<template>
    <div id="app">
        <home-page v-if="stage === 0"
                   v-on:listenToGoToPageEvent="goToPage"
                   v-on:listenToGetProjectsEvent="getProjects">
        </home-page>
        <div v-if="stage === 1">
            <top-bar v-on:listenToGoToPageEvent="goToPage"
                     v-on:listenToGoToFrameEvent="goToFrame"
                     v-bind:projects="this.projects"
                     v-bind:user_id="this.userId"
                     style="min-width: 750px;"/>
            <div ref="content" class="content">
                <timeline-frame v-if="frame === 0" />
                <task-frame ref="task" v-if="frame === 1" v-bind:project-id="this.currProjectId"/>
                <issue-frame ref="issue" v-if="frame === 2" v-bind:project-id="this.currProjectId"/>
                <resource-page ref="resource" v-if="frame === 3" v-bind:project-id="this.currProjectId"/>
                <member-frame ref="member" v-if="frame === 4" v-bind:project-id="this.currProjectId"/>
                <user-info-frame v-if="frame === 5" v-bind:user_id="this.userId"/>
                
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import VueMaterial from 'vue-material';
    import axios from 'axios'

    Vue.use(VueMaterial);

    import TopBar from "./components/TopBar";
    import HomePage from "./components/HomePage";
    import TimelineFrame from "./components/frames/TimelineFrame";
    import TaskFrame from "./components/frames/TaskFrame";
    import IssueFrame from "./components/frames/IssueFrame";
    import ResourcePage from "./components/frames/ResourceFrame";
    import MemberFrame from "./components/frames/MemberFrame";
    import UserInfoFrame from "./components/frames/UserInfoFrame"
    import {api} from './script/apis'


    export default {
        name: 'app',
        components: {UserInfoFrame, MemberFrame, ResourcePage, IssueFrame, TaskFrame, TimelineFrame, HomePage, TopBar},
        data: function () {
            return {
                stage: 0,   // 0 for login page, 1 for columns
                frame: 0,
                userId : null,
                projects: [],
                currProjectId: null,
                token: null,
            }
        },
        methods: {
            getProjects(userId, token) {
                this.userId = userId
                this.token = token
                axios.get(api.project, {
                    params: {
                        'users__id': userId
                    }, 
                    headers: {
                        'Authorization': 'JWT ' + token
                    }
                })
                .then((response) => {
                    var data = response.data
                    var x
                    for (x in data) {
                        this.projects.push(data[x])
                    }
                    this.goToPage(1)
                })

            },
            goToPage(idx) {
                console.log('go to ' + idx);
                this.stage = idx;
            },
            goToFrame(idx, projId) {
                console.log('go to frame ' + idx);
                this.currProjectId = projId;
                this.frame = idx;
                switch (idx) {
                    case 1:
                    this.$refs.task.created(projId)
                    break
                    case 2:
                    this.$refs.issue.created(projId)
                    break
                    case 3:
                    this.$refs.resource.created(projId)
                    break
                    case 4:
                    this.$refs.member.created(projId)
                    break
                }
            },
        }
    }
</script>

<style>
    body {
        margin: 0 auto !important;
        width: 100% !important;
        /*overflow-x: hidden;*/
        min-width: 750px;
        /*min-height: 800px;*/
    }

    a {
        text-decoration: none;
    }

    #app {
        position: fixed;
        font-family: Helvetica, Tahoma, Arial, STXihei, “华文细黑”, “Microsoft YaHei”, “微软雅黑”, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        min-width: 750px !important;
    }

    .content {
        position: absolute;
        top: 40px;
        width: 100%;
        min-height: 100%;
        background-color: floralwhite;
        padding-left: 30px;
        padding-right: 30px;
    }
</style>