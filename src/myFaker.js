let myFaker = {
    _isFunction: obj => {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    argsMap: {},
    calls : [],
    invalidCalls: 0,
    obj: this,
    currentKey: 0,
    callWithArgsFunc: function({args, ctx, func, funcArgs}) {
        var o = {count: 0};
        var action = "CallSavedFunction";
        let ret;
        if(this._isFunction(func)){
            action = "CallExternalFunction";
            o.func = func;
        }
        if(typeof funcArgs !== "undefined")
        {
            o.funcArgs = funcArgs;
        }
        if(typeof ctx !== 'undefined')
        {
            o.ctx = ctx;
        }
        o.action = action;
        this.argsMap[JSON.stringify(args)] = o;

        return function() {
            this.call(...args);
        }
    },
    callWithArgsReturns: function({args, value}) {
        this.argsMap[JSON.stringify(args)] = {action: "ReturnValue", value, count: 0};
        var obj = this;
        return function() {
            return obj.call(args);
        }
    },
    _addCallStack: function({action, args, funcName, funcArgs, ctx})
    {
        let argsPart, ctxPart, funcArgsPart, funcNamePart, msg;
        if(args)
            argsPart = ", called with args: " + args;
        if(ctx)
            ctxPart = ", with context -> " + ctx;
        if(funcName)
            funcNamePart = ", ["+funcName+ "]";
        if(funcArgs)
            funcArgsPart = ", with funcArgs: " + funcArgs;

        if(action === "returnValue")
            msg = "Function" + argsPart + " returned value";

        if(action === "CallSavedFunction")
            msg = "Saved function called" + 
            funcName? funcNamePart: "" +
            funcArgs? funcArgsPart: "" + 
            ctx? ctxPart: "";

        if(action === "CallExternalFunction")
            msg =  "External function called" + 
            funcName? funcNamePart: "" +
            funcArgs? funcArgsPart: "" + 
            ctx? ctxPart: "";
        
        this.calls.push({msg, args, funcName, funcArgs, ctx});
    },
    call: function(...args) {
        let callArgs = JSON.stringify(args[0]);
        if(this.argsMap[callArgs]){

            this.argsMap[callArgs].count =  this.argsMap[callArgs].count + 1;
          
            let action = this.argsMap[callArgs].action;
            if(action === "ReturnValue")
            {  
                let value = this.argsMap[callArgs].value;
                this._addCallStack({args: callArgs, action});
                return value;
            }
            else if (action === "CallSavedFunction")
            {
                msg = "Saved Function called with args: " + this.argsMap[callArgs].funcArgs;
                this._addCallStack({args: args, action});
                return this.call(this.argsMap[callArgs].funcArgs);
            }
            else if (action === "CallExternalFunction")
            {
                var o = this.argsMap[callArgs];
                if(o.ctx)
                {
                    if(o.funcArgs)
                    {
                        this._addCallStack({ctx: o.ctx, funcName:o.func.name, funcArgs: o.funcArgs, action});
                        return o.func.call(o.ctx, o.funcArgs);
                    }
                    else
                    {
                        this._addCallStack({ctx: o.ctx, funcName:o.func.name, action});
                        return  o.func.call(o.ctx);
                    }
                }
                else
                {
                    if(o.funcArgs)
                    {
                        this._addCallStack({args: o.funcArgs, funcName:o.func.name, action});
                        return o.func(o.funcArgs);
                    }
                    else
                    {
                        this._addCallStack({funcName:o.func.name,action});
                        return o.func();
                    }
                }
            }
        }
        else
        {
            msg = "Args are not mapped";
            this.invalidCalls = this.invalidCalls + 1;
            this.calls.push({args: callArgs, msg});
            return msg;
        }
    },
    getCall: function(int){
        return { args:this.calls[int].args, ret:this.calls[int].ret};
    
    },
    lastCall: function() {
        return { args:this.calls[this.calls.length - 1].args,
             ret:this.calls[this.calls.length - 1].ret};
    },
    callCount: function() {
        return this.calls.length;
    },
    invalidCallCount: function() {
        return this.invalidCalls;
    },
    callStack: function() {
        return this.calls;
    },
    callCountWithArgs: function(...args) {
        let callArgs = JSON.stringify(args[0]);
        return this.argsMap[callArgs].count;
    }
};

module.exports = {myFaker};