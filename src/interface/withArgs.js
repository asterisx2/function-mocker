let errorNoArgMsg = require('../utils/constants').values.error.noArgs;
let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function withArgs(...args) {

    if(args.length == 0)
        throw(errorNoArgMsg.
            replace('[Args]', 'args').
            replace('[Function]', 'withArgs'));

    if(!this._mocker_)
        throw(errorNoMockerMsg);
    
    let key = JSON.stringify(args);
    let data  = this._mocker_.data;

    //Create a new key in the args map
    data.argsMap[key] = {};
    
    //Set newMock's args
    data.newMock.args = args;

    let ret = {};
    var context = this;

    Object.defineProperty(ret, '_mocker_', {
        value: context._mocker_,
        enumerable: false
    });


    ret.returns = context._mocker_.returns;
    ret.callsFunc = context._mocker_.callsFunc;
    
    return ret; 
};