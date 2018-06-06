module.exports = function withArgs(...args) {
    if(!this._mocker_)
            throw("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
            
        this._data_.call.args = args;

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

        ret.returns = context._mocker_.returns;
        ret.callsFunc = context._mocker_.callsFunc;
        return ret; 
}