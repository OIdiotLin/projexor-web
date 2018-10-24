<template>
    <div id="app">
        <home-page v-if="stage === 0"
                   v-on:listenToGoToPageEvent="goToPage">
        </home-page>
        <div v-if="stage === 1">
            <top-bar v-on:listenToGoToPageEvent="goToPage"
                     v-on:listenToGoToFrameEvent="goToFrame"
                     style="min-width: 750px;"/>
            <div ref="content" class="content">
                <timeline-frame v-if="frame === 0"/>
                <task-frame v-if="frame === 1"/>
                <resource-page v-if="frame === 2"/>
                <member-frame v-if="frame === 3"/>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import VueMaterial from 'vue-material';

    Vue.use(VueMaterial);

    import TopBar from "./components/TopBar";
    import HomePage from "./components/HomePage";
    import TimelineFrame from "./components/frames/TimelineFrame";
    import TaskFrame from "./components/frames/TaskFrame";
    import ResourcePage from "./components/frames/ResourceFrame";
    import MemberFrame from "./components/frames/MemberFrame";


    export default {
        name: 'app',
        components: {MemberFrame, ResourcePage, TaskFrame, TimelineFrame, HomePage, TopBar},
        data: function () {
            return {
                stage: 0,   // 0 for login page, 1 for columns
                frame: 0,
            }
        },
        methods: {
            goToPage(idx) {
                console.log('go to ' + idx);
                this.stage = idx;
            },
            goToFrame(idx) {
                console.log('go to frame ' + idx);
                this.frame = idx;
            }
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
