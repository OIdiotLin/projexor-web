<template>
    <div>
        <md-card v-for="(event, idx) in events" v-bind:key="idx" class="event">
            <md-card-content class="padding-15">
                <div>
                    <div v-if="event.type === 'join-team'" class="inline">
                        <a href="#" class="inline emphasize">{{event.username}}</a>
                        加入了团队
                        <a href="#" class="inline emphasize">{{event.team}}</a>
                    </div>

                    <div v-if="event.type === 'add-task'" class="inline">
                        <a href="#" class="inline emphasize">{{event.username}}</a>
                        添加了任务
                        <a href="#" class="inline emphasize">{{event.task}}</a>
                    </div>

                    <div v-if="event.type === 'finish-task'" class="inline">
                        <a href="#" class="inline emphasize">{{event.username}}</a>
                        完成了任务
                        <a href="#" class="inline emphasize">{{event.task}}</a>
                    </div>

                    <div class="inline-right darkgray">{{event.datetime}}</div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>

    export default {
        name: "TimelineFrame",
        data() {
            return {
                events: [{
                    type: 'finish-task',
                    username: '黄文禹',
                    task: '系统概要设计',
                    datetime: '23:46, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '林会东',
                    team: 'lmmnb',
                    datetime: '21:22, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '黄文禹',
                    team: 'lmmnb',
                    datetime: '21:12, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '李榷基',
                    team: 'lmmnb',
                    datetime: '21:05, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '于竞超',
                    team: 'lmmnb',
                    datetime: '21:03, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '岳靖喆',
                    team: 'lmmnb',
                    datetime: '20:22, October 21, 2018'
                }, {
                    type: 'add-task',
                    username: '宗文智',
                    task: '系统概要设计',
                    datetime: '19:25, October 21, 2018'
                }, {
                    type: 'add-task',
                    username: '宗文智',
                    task: 'UI原型设计',
                    datetime: '19:25, October 21, 2018'
                }, {
                    type: 'add-task',
                    username: '宗文智',
                    task: '数据库设计',
                    datetime: '19:25, October 21, 2018'
                }, {
                    type: 'join-team',
                    username: '宗文智',
                    team: 'lmmnb',
                    datetime: '19:20, October 20, 2018'
                },]
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

    .event {
        position: relative;
        margin: 30px auto;
        max-width: 800px;
        min-width: 550px;
    }
</style>