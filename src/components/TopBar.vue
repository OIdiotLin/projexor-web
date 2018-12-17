<template>
    <div ref="top-bar" id="top-bar" class="shadow">
        <a v-on:click="goToFrame(4)"><img src="../assets/logo.png" ref="logo" id="logo"/></a>
        <nav>
            <a href="#" v-for="(item, idx) in menuItems" :key="idx" v-on:click="goToFrame(idx)">{{item}}</a>
            <button class="create" v-on:click="createProject">新建</button>
            <select v-model="selected" class="select" v-on:change="changeProject()">
                <option :value="project.id" v-for="(project, idx) in projects" :key="idx ">{{project.name}}</option>
            </select>
        </nav>

    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from '../script/apis';

    export default {
        name: "TopBar",
        data() {
            return {
                menuItems: ['任务', '帖子', '资源', '成员'],
                selected: '',
                curridx: null
            }
        },
        created() {
            this.selected = this.projects[0].id;
            this.curridx = 0;
            this.goToFrame(0, this.selected)
        },
        methods: {
            goToFrame(idx) {
                this.curridx = idx;
                this.$emit('listenToGoToFrameEvent', idx, this.selected);
            },
            changeProject: function () {
                this.$cookies.set('project_id', this.projects[this.curridx].id);
                this.goToFrame(this.curridx)
            },
            createProject: function () {
                var project_name = prompt("请输入要创建的项目名", '');
                axios.post(api.project(), {
                    name: project_name,
                    users: [{'id': this.user_id}]
                }, {
                    headers: {'Authorization': this.$cookies.get('JWT')}
                }).then((response) => {
                    console.log(response);
                    alert("创建成功");
                    this.goToFrame(0);
                }).catch((error) => {
                    console.log(error);
                    alert("创建失败")
                })
            }
        },
        props: {
            projects: null,
            user_id: null
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
        top: 7px;
        line-height: 1;
        text-decoration: none !important;
        font-weight: bold;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px;
    }

    .select {
        color: rgb(0, 0, 0) !important;
        height: 30px;
        font-size: medium;
        position: absolute;
        margin-left: 20px;
        margin-right: 20px;
        right: 150px
    }

    .create {
        color: rgb(0, 0, 0) !important;
        height: 30px;
        font-size: medium;
        position: absolute;
        margin-left: 20px;
        margin-right: 20px;
        right: 30px
    }
</style>