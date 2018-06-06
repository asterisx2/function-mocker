let should = require('chai').should();
let expect = require('chai').expect;

let myFaker = require("../src/myFaker").myFaker;

describe.skip('My Faker', () => {
    it('Should return correct values for correct args', () => {
        var args = ["arg1", "arg2"];
        var value = "Case 1";
        myFaker.callWithArgsReturns({args, value});
        myFaker.call(args).should.eql(value);

        var args2 = {args, arg:"Some other args", c: 1};
        var ret2 = "Call 2";

        myFaker.callWithArgsReturns({args: args2, value:ret2});
        myFaker.call(args2).should.eql(ret2);
       
    });
    describe('Should call functions', () => {
        it('Should return a callable function', () => {
            var args = ["arg1", "arg2"];
            var value = "Case 1";
            var myFunc = myFaker.callWithArgsReturns({args, value});
            myFunc(args).should.eql(value);
        });
        it('Should make deep recursive calls', () => {
            var args = ["arg1", "arg2"];
            var value = "Case 1";
            myFaker.callWithArgsReturns({args, value});
            myFaker.call(args).should.eql(value);
    
            var args2 = {args, arg:"Some other args", c: 1};
            var ret2 = "Call 2";
    
            myFaker.callWithArgsReturns({args: args2, value:ret2});
            myFaker.call(args2).should.eql(ret2);

            let args3={};
            Object.assign(args3, args);
            Object.assign(args3, args2);

            myFaker.callWithArgsFunc({args: args3, funcArgs: args});
            myFaker.call(args3).should.equal(value);

            let args4 = "Deep function recursive call";
            myFaker.callWithArgsFunc({args:args4, funcArgs:args3});
            myFaker.call(args4).should.equal(value);
            });
        it('Without args', () => {
            let externalFunctionCount = 0;
            let externalFunction = function(){
                externalFunctionCount = externalFunctionCount + 1;
            };
            let eargs = "ExternalFunction";
            myFaker.callWithArgsFunc({args: eargs, func: externalFunction});
            myFaker.call(eargs);
            externalFunctionCount.should.equal(1);
        });
        it('With args', () => {
            let externalFunctionWithArgsCount = 0;
            let functionArgs = {"Some": 1, c:209, d:[20,"Here"]};
            let externalFunctionWithArgs = function(...args){
                args.length.should.equal(1);
                args[0].should.eql(functionArgs);
                externalFunctionWithArgsCount = externalFunctionWithArgsCount + 1;
            };
            let eargsWithArgs = "Externalfunctionwithargs";
            myFaker.callWithArgsFunc({args: eargsWithArgs, func: externalFunctionWithArgs, funcArgs: functionArgs});
            myFaker.call(eargsWithArgs);
            externalFunctionWithArgsCount.should.equal(1);
        });
        describe('With Context', () => {
            let ctx = {
                greeting: "Hello from ctx, "
            };
           
            it('Without any parameters', () => {
                let uniqueArgs = "ExternalFuncWithCtx";
                function functionWithCtx() {
                    return this.greeting;
                }
                myFaker.callWithArgsFunc({args: uniqueArgs, ctx, func: functionWithCtx});
                myFaker.call(uniqueArgs).should.equal(ctx.greeting);
            });
            it('With parameters', () => {
                let uniqueArgs = "ExternalFuncWithCtxWithArgs";
                function functionWithCtx(args) {
                    return this.greeting + args;
                }
                let funcArgs = " function with args";
                myFaker.callWithArgsFunc({args: uniqueArgs, ctx, func: functionWithCtx, funcArgs});
                myFaker.call(uniqueArgs).should.equal(ctx.greeting + funcArgs);
                console.log(myFaker.callStack());
            });
            
        });
    });
});