let interfaceDirectory = './interface/';
let withArgs = require(interfaceDirectory + 'withArgs'); 
let returns = require(interfaceDirectory + 'returns');
let withCtx = require(interfaceDirectory + 'withCtx');
let callsFunc = require(interfaceDirectory + 'callsFunc');
let build = require(interfaceDirectory + 'build');
let done = require(interfaceDirectory + 'done');
let invoke = require(interfaceDirectory + "_invoke_");
let mock = require(interfaceDirectory + 'mock');
let _isfunction_ = require('./utils/utils')._isfunction_;
let data = require(interfaceDirectory + 'data');

let _mocker_ = {
    _isfunction_,
    withArgs,
    returns,
    withCtx,
    callsFunc,
    done,
    build,
    invoke,
    mock,
    data
}
module.exports = {
    mock: function(){
        return _mocker_.mock();
    },
}
