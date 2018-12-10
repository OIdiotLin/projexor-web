<template>
    <div ref="top-bar" id="top-bar" class="shadow">
        <img src="../assets/logo.png" ref="logo" id="logo"/>
        <nav>
            <a href="#" v-for="(item, idx) in menuItems" :key="idx" v-on:click="goToFrame(idx)">{{item}}</a>
            <select v-model="selected" class="select">
            <option v-for="(project, idx) in projects" :key="idx" >{{project.name}}</option>
            </select>
        </nav>

    </div>
</template>

<script>
    export default {
        name: "TopBar",
        data() {
            return {
                menuItems: ['动态', '任务', '帖子', '资源', '成员'],
                projects: [{
                    name: "项目A"
                }, {
                    name: "项目B"
                }]
            }
        },
        methods: {
            goToFrame(idx) {
                this.$emit('listenToGoToFrameEvent', idx);
            }
        }
    }
</script>

<style scoped>

    #top-bar {
        position: fixed;
        display: inline-block;
        top: 0;
        width: 100%;
        height: 40px;
        background: #003366;
        padding-top: 5px;
        padding-left: 20px;
        z-index: 1000;
    }

    #logo {
        float: left;
        height: 30px;
    }

    .shadow {
        -webkit-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
        -moz-box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
        box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.55);
    }

    nav {
        float: left;
        display: inline-block;
        height: 30px;
    }

    nav a {
        color: white !important;
        font-size: medium;
        position: relative;
        /* top: 7px; */
        line-height: 1;
        text-decoration: none !important;
        font-weight: bold;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px;
    }

    .select{
        color: rgb(0, 0, 0) !important;
        height: 30px;
        font-size: medium;
        position: relative;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>