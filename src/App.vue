<template>
    <div id="app">
        <top-bar v-on:listenToGoToPageEvent="goToPage"/>
        <div ref="content" class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin viverra sem et arcu tincidunt, maximus faucibus sapien vehicula. Vestibulum nec dolor vitae elit laoreet pellentesque. Fusce tristique blandit metus, sed auctor orci placerat vitae. In accumsan luctus leo, sed tincidunt risus ornare in. Suspendisse cursus, erat eu congue scelerisque, velit massa laoreet orci, a hendrerit elit ante et mi. Morbi auctor sollicitudin eros, sit amet vulputate neque. Donec eu ultricies mi. Pellentesque mauris lectus, volutpat ut malesuada eu, aliquam ac quam. Etiam semper vestibulum nisi sit amet scelerisque. Mauris sit amet aliquam dui, a ullamcorper lectus. Donec elit lorem, rhoncus nec mi nec, congue malesuada diam. Aliquam sit amet ligula diam. Morbi id lacus ac mauris elementum auctor. Proin ac varius libero, vel aliquet nulla. Nunc placerat laoreet faucibus. Aenean iaculis facilisis odio, vitae varius justo luctus et.

            Nam ut iaculis elit, at tincidunt dui. Morbi risus lacus, fermentum eget libero id, sollicitudin tincidunt enim. Aliquam erat volutpat. Morbi a augue vitae lorem rutrum imperdiet non nec quam. Aliquam ac velit mollis, ullamcorper odio sed, hendrerit odio. Nulla id fermentum diam. Maecenas tincidunt interdum nulla sed facilisis.

            Ut tincidunt felis vitae turpis eleifend porta. Sed finibus, justo sit amet dignissim ullamcorper, mauris lorem consectetur est, eget eleifend quam sapien eu sapien. Aliquam lorem ligula, dapibus elementum tempus non, ultricies at odio. Etiam dignissim quam volutpat aliquet sagittis. Mauris id lacinia eros. Donec ultricies, eros efficitur euismod elementum, augue justo tempor felis, vel mattis ipsum urna eget lacus. Nam mollis nibh sapien, tristique pharetra neque laoreet nec.
        </div>
    </div>
</template>

<script>

    import TopBar from "./components/TopBar";
    export default {
        name: 'app',
        components: {TopBar},
        methods: {
            goToPage(idx) {
                this.$content.content = idx;
            }
        }
    }
</script>

<style>
    body {
        margin: 0 !important;
        width: 100% !important;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        width: 100%;
    }

    .content {
        position: relative;
        top: 35px;
        width: 100%;
        max-width: 100%;
        height: 1000px;
        background: #66ccff;
        padding: 10px 20px 10px 20px;
    }
</style>
