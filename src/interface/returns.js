let errorNoArgMsg = require('../utils/constants').values.error.noArgs;
let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function (value) {

    if(!value)
        throw(errorNoArgMsg.
            replace('[Args]', 'value').
            replace('[Function]', 'returns'));

    if(!this._mocker_)
        throw(errorNoMockerMsg);

    let data  = this._mocker_.data;

    data.newMock.returnValue = value;

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