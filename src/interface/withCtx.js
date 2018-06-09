let errorNoArgMsg = require('../utils/constants').values.error.noArgs;
let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;
module.exports = function(ctx) {
    if(!ctx)
        throw(errorNoArgMsg.replace('[Args]', 'ctx').replace('[Function]', 'withCtx'));

    if(!this._mocker_)
        throw(errorNoMockerMsg);

    let functions = this._mocker_.data.newMock.functions;
    functions[functions.length - 1].ctx = ctx;
    let ret = {};
    var context = this;

    Object.defineProperty(ret, '_mocker_', {
        value: context._mocker_,
        enumerable: false
    });

    ret.done = context._mocker_.done;
    ret.callsFunc = context._mocker_.callsFunc;
    return ret; 
};