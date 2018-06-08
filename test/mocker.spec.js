let should = require('chai').should();
let expect = require('chai').expect;
let mocker = require('../src/mocker');

describe('Mocker', () => {

    it('Should return correct value for params', () => {
        let someArgs = "Some args";
        let someReturnValue = {text: "someReturnValue", prop: 1};
        let mock = mocker.mock();

        mock.withArgs(someArgs).returns(someReturnValue).done();
        let func = mock.build();

        func(someArgs).should.equal(someReturnValue);
    });

    describe('Functions', () => {

        describe('One function', () => {

            let mock = mocker.mock();
            let someArgs = "someArgs";
            
            it('Should call', () => {
                
                let wasFunctionCalled = false;
                let afunction = function() {
                    wasFunctionCalled = true;
                };  
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction).done().build();
    
                mockFunc(someArgs);
    
                wasFunctionCalled.should.equal(true);
            
            });

            it('With ctx', () => {
                
                var ctx = {};
                let funcWasCalledWithCtx = false;
                let afunction = function () {
                    funcWasCalledWithCtx = this === ctx;
                };
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction).withCtx(ctx).done().build();

                mockFunc(someArgs);

                funcWasCalledWithCtx.should.equal(true);

            });

            it('With Args', () => {

                let functionCalledWithCorrectArgs = false;
                var funcArgs = {
                    life: 42,
                    msg: "Does it matter?"
                };
                let afunction = function(args) {
                    functionCalledWithCorrectArgs = args === funcArgs;
                };  
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, funcArgs).done().build();
    
                mockFunc(someArgs);
    
                functionCalledWithCorrectArgs.should.equal(true);
            });

        });

        describe('Multiple functions', () => {
            
            let mock = mocker.mock();
            let someArgs = "someArgs";

            it('Should call', () => {
                
                let functionCalledTimes = 0;
                var afunction = function() {
                    functionCalledTimes++;
                };
                let bfunction = function(){
                    functionCalledTimes++;
                };
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, bfunction).done().build();

                mockFunc(someArgs);

                functionCalledTimes.should.equal(2);

            });

            it('With ctx', () => {

                var ctx = {};
                let functionCalledWithCtxTimes = 0;
                var funcArgs = {
                    life: 42,
                    msg: "Does it matter?"
                };
                let afunction = function () {
                    functionCalledWithCtxTimes = this == ctx? functionCalledWithCtxTimes + 1 : 0;
                };
                let bfunction = function () {
                    functionCalledWithCtxTimes = this == ctx? functionCalledWithCtxTimes + 1 : 0;
                };
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, bfunction, funcArgs).withCtx(ctx).done().build();

                mockFunc(someArgs);

                functionCalledWithCtxTimes.should.equal(2);

            });

            it('With Args', () => {

                let functionCalledWithCorrectArgsTimes = 0;
                var funcArgs = {
                    life: 42,
                    msg: "Does it matter?"
                };
                let afunction = function (args) {
                    functionCalledWithCorrectArgsTimes = args == funcArgs? functionCalledWithCorrectArgsTimes + 1 : 0;
                };
                let bfunction = function (args) {
                    functionCalledWithCorrectArgsTimes = args == funcArgs? functionCalledWithCorrectArgsTimes + 1 : 0;
                };
                let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, bfunction, funcArgs).done().build();

                mockFunc(someArgs);

                functionCalledWithCorrectArgsTimes.should.equal(2);
            });
        });
    });
});