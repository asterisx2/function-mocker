module.exports = function(...args) {
    if(!this._mocker_)
        throw("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

    if(!this._data_.call.funcs)
        this._data_.call.funcs = {arr: []};

    args.forEach(arg => {
        if(this._mocker_._isfunction_(arg))
            this._data_.call.funcs.arr.push(arg);
        else
            this._data_.call.funcs.args = arg;
    });

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
    ret.withCtx = context._mocker_.withCtx;
    return ret; 

    /*return {_mocker_:this._mocker_, 
        withCtx: this._mocker_.withCtx,
        done: this._mocker_.done,  
        _data_: this._data_};*/
}