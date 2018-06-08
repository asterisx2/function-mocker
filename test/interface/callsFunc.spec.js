let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let callsFunc = require(srcFolder + 'interface/callsFunc');
let errorNoMockerMsg = require(srcFolder  + 'utils/constants').values.error.noMocker;
let errorNoArgMsg = require(srcFolder + 'utils/constants').values.error.noArgs;
let _isfunction_ = require(srcFolder + '/utils/utils')._isfunction_;

describe('callsFunc', () => {
    let mocker = {
        _mocker_ :{
            data:{
                newMock:{
                    functions: [],
                    ctx: {}
                }
            },
            _isfunction_,
            done: function(){},
            withCtx: function(){},
            callsFunc: function(){}
        },
       
    };
    describe('Functions', () => {

        describe('Single', () => {

            it('Should store in new Mock with args', () => {

                let mocker = {
                    _mocker_ :{
                        data:{
                            newMock:{
                                functions: [],
                                ctx: {}
                            }
                        },
                        _isfunction_,
                        done: function(){},
                        withCtx: function(){},
                        callsFunc: function(){}
                    },
                   
                };

                var funcArgs = {someValue: 'someValue'};
                var afunction = function () {};
                callsFunc.call(mocker, afunction, funcArgs);

                let savedfunctions = mocker._mocker_.data.newMock.functions;
                savedfunctions.length.should.equal(1);
                savedfunctions[0].funcs.length.should.equal(1);
                savedfunctions[0].funcs.should.eql([afunction]);
                savedfunctions[0].args.should.equal(funcArgs);

            });

            it('Should store in new Mock without args', () => {
                
                let mocker = {
                    _mocker_ :{
                        data:{
                            newMock:{
                                functions: [],
                                ctx: {}
                            }
                        },
                        _isfunction_,
                        done: function(){},
                        withCtx: function(){},
                        callsFunc: function(){}
                    },
                   
                };

                var afunction = function () {};
                callsFunc.call(mocker, afunction);

                let savedfunctions = mocker._mocker_.data.newMock.functions;
                savedfunctions.length.should.equal(1);
                savedfunctions[0].funcs.length.should.equal(1);
                savedfunctions[0].funcs.should.eql([afunction]);

            });

        });
        describe('Multiple', () => {

            it('Should store in new Mock with args', () => {

                let mocker = {
                    _mocker_ :{
                        data:{
                            newMock:{
                                functions: [],
                                ctx: {}
                            }
                        },
                        _isfunction_,
                        done: function(){},
                        withCtx: function(){},
                        callsFunc: function(){}
                    },
                   
                };

                var funcArgs = {someValue: 'someValue'};
                var afunction = function () {};
                var bfunction = function () {};
                callsFunc.call(mocker, afunction, bfunction, funcArgs);

                let savedfunctions = mocker._mocker_.data.newMock.functions;
                savedfunctions.length.should.equal(1);
                savedfunctions[0].funcs.length.should.equal(2);
                savedfunctions[0].funcs.should.eql([afunction, bfunction]);
                savedfunctions[0].args.should.equal(funcArgs);
                
            });

            it('Should store in new Mock with different args', () => {

                let mocker = {
                    _mocker_ :{
                        data:{
                            newMock:{
                                functions: [],
                                ctx: {}
                            }
                        },
                        _isfunction_,
                        done: function(){},
                        withCtx: function(){},
                        callsFunc: function(){}
                    },
                   
                };

                var funcArgs1 = {someValue: 'someValue'};
                var funcArgs2 = {someValue2: 'someValue2'};

                var afunction = function () {};
                var bfunction = function () {};

                callsFunc.call(mocker, afunction, funcArgs1);
                callsFunc.call(mocker, bfunction, funcArgs2);

                let savedfunctions = mocker._mocker_.data.newMock.functions;
                savedfunctions.length.should.equal(2);

                savedfunctions[0].funcs.length.should.equal(1);
                savedfunctions[0].funcs.should.eql([afunction]);
                savedfunctions[0].args.should.equal(funcArgs1);

                savedfunctions[1].funcs.length.should.equal(1);
                savedfunctions[1].funcs.should.eql([bfunction]);
                savedfunctions[1].args.should.equal(funcArgs2);

            });

            it('Should store in new Mock without args', () => {

                let mocker = {
                    _mocker_ :{
                        data:{
                            newMock:{
                                functions: [],
                                ctx: {}
                            }
                        },
                        _isfunction_,
                        done: function(){},
                        withCtx: function(){},
                        callsFunc: function(){}
                    },
                   
                };

                var afunction = function () {};
                var bfunction = function () {};
                callsFunc.call(mocker, afunction, bfunction);

                let savedfunctions = mocker._mocker_.data.newMock.functions;
                savedfunctions.length.should.equal(1);
                savedfunctions[0].funcs.length.should.equal(2);
                savedfunctions[0].funcs.should.eql([afunction, bfunction]);

            });

        });

    });

    it('Should return proper properties', () => {

        let properties = ["done", "withCtx", "callsFunc", "_mocker_"];
        let funcs = [function() {}];
        let ret = callsFunc.call(mocker, ...funcs);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));

        ret.done.should.equal(mocker._mocker_.done);
        ret.withCtx.should.equal(mocker._mocker_.withCtx);
        ret.callsFunc.should.equal(mocker._mocker_.callsFunc);

    });
    describe('Throws error', () => {

        it('When called with no arguments passed', () => {
            expect(callsFunc).to.throw(errorNoArgMsg.replace('[Args]', 'args').replace('[Function]', 'callsFunc'));
        });
    
        it('When called without any context', () => {
            let args = {};
            expect(function() {callsFunc(args);}).to.throw(errorNoMockerMsg);
        });

    });
});