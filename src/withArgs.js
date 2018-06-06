function withArgs() {
    var obj = this;
    function withCtx(...args){
        return withCtx.call(obj, ...args);
    }
    return {
        withCtx,
        returns,
        callsFunc,
        callsWithArgs,
        get
    }
}