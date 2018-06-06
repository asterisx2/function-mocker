module.exports = function() {
    if(!this._mocker_)
        throw ("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

    this._data_.callStack.push(this._data_.call);
    this._data_.call = {};

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

    ret.build = context._mocker_.build;
    ret.withArgs = context._mocker_.withArgs;

    return ret; 

    /*return {_mocker_:this._mocker_, 
        withArgs: this._mocker_.withArgs, 
        build: this._mocker_.build,
        _data_: this._data_};*/
}