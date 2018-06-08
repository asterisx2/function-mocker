let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function() {
    if(!this._mocker_)
        throw (errorNoMockerMsg);

    let data  = this._mocker_.data;

    data.argsMap[JSON.stringify(data.newMock.args)] = data.newMock;
    data.newMock = {};

    let ret = {};
    var context = this;

    Object.defineProperty(ret, '_mocker_', {
        value: context._mocker_,
        enumerable: false
    });

    ret.build = context._mocker_.build;
    ret.withArgs = context._mocker_.withArgs;

    return ret; 
};