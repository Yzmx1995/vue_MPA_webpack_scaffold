function handleError(err) {
    // Vue.prototype.$message.error(err.msg || err.message || msg || '请求失败');
    console.log(err, 'handleErr');
}

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.handleError = handleError;
    Object.defineProperty(Vue.prototype, '$handleError', { value: handleError });
}

export default plugin;