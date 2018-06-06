let should = require('chai').should();
let expect = require('chai').expect;
let mocker = require('../src/mocker');

describe('Mocker', () => {
    it('Should return correct value for params', () => {
        let someArgs = "Some args";
        let someReturnValue = {text: "someReturnValue", prop: 1};
        let mock = mocker.new();

        mock.withArgs(someArgs).returns(someReturnValue).done();
        let func = mock.build();

        func(someArgs).should.equal(someReturnValue);
    });
    it('Should just work', () => {
        var obj = {
            me: "Obj"
        };
        var obj2 = {
            me: "Obj2"
        };
        let helloFunc = function(){console.log("1 Hello from "+this.me)};
        let helloFunc2 = function(){console.log("2 Hello from "+this.me)};
        var ret = "Hello from return";
        let args = ['Some Args', 1, 2];
        let args2 = "args2";
        let args3 = "arg3";
        let args4 = "args4";
        let ret2 = "Some other value";
        let hello = () => console.log("Hello from lambda function");
        let mock = mocker.new();
        
        mock.withArgs(args).returns(ret).callsFunc(helloFunc, helloFunc2).withCtx(obj).done();
       
        mock.withArgs(args2).returns(ret2).done();

        mock.withArgs(args3).callsFunc(helloFunc, helloFunc2).withCtx(obj2).done();

        mock.withArgs(args4).callsFunc(hello, hello).done();
        
        let args5 = "args5";

        let func5 = function(message){
            console.log(message + " from 5");
        }
        let func6 = function(message){
            console.log(message + " from 6");
        }
        let funcArgs = "Hello";
        mock.withArgs(args5).callsFunc(func5, func6, funcArgs).done();

        let func = mock.build();
        func(args).should.equal(ret);
        func(args2).should.equal(ret2);

        func(args3);
        func(args4);
        func(args5);
    });
})