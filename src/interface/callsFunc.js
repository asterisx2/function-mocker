let errorNoArgMsg = require('../utils/constants').values.error.noArgs;
let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function(...args) {
   
    if(args.length === 0)
        throw(errorNoArgMsg.replace('[Args]', 'args').replace('[Function]', 'callsFunc'));

    if(!this._mocker_)
        throw(errorNoMockerMsg);

    let data  = this._mocker_.data;
    
    if(!data.newMock.functions)
        data.newMock.functions = [];

    
    let funcSet = {
        funcs:[]
    };
    
    args.forEach(arg => {
        if(this._mocker_._isfunction_(arg))
            funcSet.funcs.push(arg);
        else
            funcSet.args = arg;
    });
    
    data.newMock.functions.push(funcSet);

    let ret = {};
    var context = this;
    
    Object.defineProperty(ret, '_mocker_', {
        value: context._mocker_,
        enumerable: false
    });

    ret.done = context._mocker_.done;
    ret.withCtx = context._mocker_.withCtx;
    ret.callsFunc = context._mocker_.callsFunc;

    return ret; 
};