module.exports = function (value) {
    if(!this._mocker_)
        throw("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

    this._data_.call.value = value;

    let ret = {};
    var context = this;
        
    Object.defineProperty(ret, '_mocker_', {
        value: context._mocker_,
        enumerable: false
    });

    Object.defineProperty(ret, '_data_', {
        value: context._data_,
        enumerable: false
    });

    ret.done = context._mocker_.done;
    ret.callsFunc = context._mocker_.callsFunc;
    return ret; 

    /*return {_mocker_:this._mocker_, 
        callsFunc: this._mocker_.callsFunc, 
        done: this._mocker_.done,  
        _data_: this._data_};*/
};