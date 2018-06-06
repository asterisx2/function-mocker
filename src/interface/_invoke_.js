module.exports = function(args) {
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