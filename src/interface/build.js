module.exports = function () {
    var ownCtx = this;
    return function(...args){
        return ownCtx._mocker_.invoke.call(ownCtx, args);
    }
}