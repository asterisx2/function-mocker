let noMatchingArgs = require('../utils/constants').values.error.noMatchingArgs;
let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function(...args) {

    if(!this._mocker_)
        throw(errorNoMockerMsg);

    if(!this._mocker_.data.argsMap.hasOwnProperty(JSON.stringify(args)))
        throw(noMatchingArgs);
    delete this._mocker_.data.argsMap[JSON.stringify(args)];

};