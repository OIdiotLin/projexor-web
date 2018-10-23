<template>
    <div id="app">
        <home-page v-if="stage === 0"
                   v-on:listenToGoToPageEvent="goToPage">
        </home-page>
        <div v-if="stage === 1">
            <top-bar v-on:listenToGoToPageEvent="goToPage"
                     v-on:listenToGoToColumnEvent="goToColumn"
                     style="min-width: 750px;"/>
            <div ref="content" class="content">

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


    export default {
        name: 'app',
        components: {HomePage, TopBar},
        data: function () {
            return {
                stage: 1,   // 0 for login page, 1 for columns
                contentShow: null
            }
        },
        methods: {
            goToPage(idx) {
                console.log('go to ' + idx);
                this.stage = idx;
                this.contentShow = idx;
            },
            goToColumn(idx) {
                console.log('go to column ' + idx);
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
        position: fixed;
        top: 35px;
        width: 100%;
        min-height: 100%;
        background-color: floralwhite;
    }
</style>
