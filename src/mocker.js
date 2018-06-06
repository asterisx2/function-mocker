let obj = {
    _isfunction_: function(o){
        return Object.prototype.toString.call(x) == '[object Function]';
    },
    withArgs: function(...args){
        if(!this._mocker_)
            return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        this._data_.call.args = args;
        return {_mocker_:this._mocker_, 
            returns: this._mocker_.returns,  
            callsFunc: this._mocker_.callsFunc,
            _data_: this._data_};
    },
    withCtx: function(ctx){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        this._data_.call.ctx = ctx;
        return {_mocker_:this._mocker_, 
            done: this._mocker_.done,  
            _data_: this._data_};
    },
    returns: function(value){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        this._data_.call.value = value;
        return {_mocker_:this._mocker_, 
            callsFunc: this._mocker_.callsFunc, 
            done: this._mocker_.done,  
            _data_: this._data_};
    },
    callsFunc: function(...funcs){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        if(!this._data_.call.funcs)
            this._data_.call.funcs = [];
        this._data_.call.funcs = this._data_.call.funcs.concat(funcs);
        return {_mocker_:this._mocker_, 
            withCtx: this._mocker_.withCtx,
            done: this._mocker_.done,  
            _data_: this._data_};
    },
    done: function(){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        this._data_.callStack.push(this._data_.call);
        this._data_.call = {};
        return {_mocker_:this._mocker_, 
            withArgs: this._mocker_.withArgs, 
            build: this._mocker_.build,
            _data_: this._data_};
    },
    build: function(){
        var ownCtx = this;
        return function(...args){
            return ownCtx._mocker_.invoke.call(ownCtx, args);
        }
    },
    invoke: function(args) {
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
        
        if(this._data_.callStack)
        {
            let callStacks = this._data_.callStack.filter(call => 
                call.args.length==args.length && call.args.every((v,i)=> v === args[i]));
            
            if(callStacks.length > 1)
                return console.error("Multiple matching call stacks found for " + args.toString());
            else if (callStacks.length == 0)
                return console.error("No matching call stacks found for " + args.toString());
            
            let callStack = callStacks[0];
            if(callStack.funcs)
            {
                callStack.funcs.forEach(func => {
                    if(callStack.ctx)
                        func.call(callStack.ctx);
                    else
                        func();
                });
            }
            if(callStack.value)
                return callStack.value;
        }

        return console.error("There is no call stack!");
    }
}
module.exports = {
    
    new: function(){
        return {_mocker_:obj, build:obj.build, withArgs: obj.withArgs, _data_: {count: 0, call: {}, callStack: []}};
    },
   
}
