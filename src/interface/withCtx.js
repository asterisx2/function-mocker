module.exports = function(ctx) {
    if(!ctx)
        throw("No context object passed to withCtx");

    if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

    this._data_.call.ctx = ctx;

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
    return ret; 

    /*return {_mocker_:this._mocker_, 
        done: this._mocker_.done,  
        _data_: this._data_};*/
}