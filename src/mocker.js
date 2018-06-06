let obj = {
    _isfunction_: function(o){
        return Object.prototype.toString.call(o) == '[object Function]';
    },
    withArgs: function(...args){
        if(!this._mocker_)
            return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
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
    },
    withCtx: function(ctx){
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
    },
    returns: function(value){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

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
    },
    callsFunc: function(...args){
        if(!this._mocker_)
        return console.error("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");

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
    },
    done: function(){
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
    },
    build: function(){
        var ownCtx = this;
        return function(...args){
            return ownCtx._mocker_.invoke.call(ownCtx, args);
        }
    },
    invoke: function(args) {
        if(!this._mocker_)
            throw("Cannot call this function without first calling a mocker, use mocker.new() to create a new mocker");
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
                callStack.funcs.arr.forEach(func => {
                    if(callStack.ctx)
                        if(callStack.funcs.args)
                            func.call(callStack.ctx, callStack.funcs.args);
                        else
                            func.call(callStack.ctx);
                    else
                        if(callStack.funcs.args)
                            func(callStack.funcs.args);
                        else
                            func();
                });
            }
            if(callStack.value)
                return callStack.value;
        }
    }
}
module.exports = {
    
    new: function(){

        let ret = {};
        var context = obj;
        
        Object.defineProperty(ret, '_mocker_', {
            value: context,
            enumerable: false
        });

        Object.defineProperty(ret, '_data_', {
            value: {count: 0, call: {}, callStack: []},
            enumerable: false
        });

        ret.build = context.build;
        ret.withArgs = context.withArgs;

        return ret; 

        //return {_mocker_:obj, build:obj.build, withArgs: obj.withArgs, };
    },
   
}
