<template>
    <div class="error-wrap">
        <div>
            <div style="text-align: center;">{{ msg }}</div>
            <img
                style="width: 300px;height: 300px;"
                src="@/assets/images/you-see-see-you-one-day-day.jpg">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'This is error page!'
        };
    }
}
</script>

<style lang="less">
.error-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px;
    box-sizing: border-box;
}
</style>

