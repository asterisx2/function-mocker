let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function () {

    if(!this._mocker_)
        throw(errorNoMockerMsg);

    var ownCtx = this;
    return function(...args){
        return ownCtx._mocker_.invoke.call(ownCtx, args);
    };
};