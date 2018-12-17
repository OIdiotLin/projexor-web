<template>
    <div>
        <md-card v-for="(reply, idx) in replies" v-bind:key="idx" class="reply">
            <md-divider/>
            <md-card-content>
                <div>
                    <a href="#" class="inline emphasize">{{reply.user.username}}</a>
                    发表于
                    <div class="inline darkgray">{{reply.time}}</div>
                </div>
                {{reply.content}}
            </md-card-content>
        </md-card>
    </div>
</template>


<script>
    import axios from 'axios'
    import {api} from '../../script/apis'
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    export default {
        name: "ReplyCard",
        props: {
            issue: null,
        },
        mounted() {
            this.getReplies()
        },
        data() {
            return {
                replies: null
            }
        },
        methods: {
            getReplies: function () {
                axios.get(api.reply(), {
                    headers: {'Authorization': this.$cookies.get('JWT')},
                    params: {'post__id': this.issue.id}
                }).then((response) => {
                    this.replies = response.data;
                    this.replies.sort((a, b) => a.time - b.time);
                    console.log(this.replies)
                })
            },
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