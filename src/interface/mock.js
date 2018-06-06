module.exports = function() {
    let ret = {};
    let context = this;
    Object.defineProperty(ret, '_mocker_', {
        value: context,
        enumerable: false
    });

    Object.defineProperty(ret, '_data_', {
        value: {count: 0, call: {}, callStack: []},
        enumerable: false
    });

    ret.build = context.build;
    ret.withArgs = context.withArgs;

    return ret; 
}