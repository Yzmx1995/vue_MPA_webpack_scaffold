<template>
    <div class="hello-world-wrap">
        <div>
            <div style="text-align: center;">{{ msg }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Hello world!'
        };
    },
    methods: {},
    beforeMount() {}
}
</script>

<style lang="less">
.hello-world-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px;
    box-sizing: border-box;
}
</style>

