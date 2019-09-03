<template>
    <div @click="f1">Hello World! in page One</div>
</template>

<script>
export default {
    methods: {
        f1() {
            this.$router.push({name:'page@otherinpageone'});
        }
    }
}
</script>

<style lang="less">
</style>

