let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let returns = require(srcFolder+'interface/returns');
let errorNoArgMsg = require(srcFolder+'utils/constants').values.error.noArgs;
let errorNoMockerMsg = require(srcFolder+'utils/constants').values.error.noMocker;

describe('returns' , () => {
    let mocker = {
        _mocker_ :{
            data:{
                newMock:{
                    returnValue: {},
                    ctx: {}
                }
            },
            done: function(){},
            callsFunc: function(){}
        }
        
    };
    it('Should add correct return value', () => {
        let value = "value";
        returns.call(mocker, value);

        mocker._mocker_.data.newMock.returnValue.should.equal(value);
    });
    it('Should return proper properties', () => {
        let properties = ["done", "callsFunc", "_mocker_"];
        let ctx = {};
        let ret = returns.call(mocker, ctx);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));
    
        ret.done.should.equal(mocker._mocker_.done);
        ret.callsFunc.should.equal(mocker._mocker_.callsFunc);
    });
    describe('Throws error', () => {
        it('When called with no arguments passed', () => {
            expect(returns).to.throw(errorNoArgMsg.replace('[Args]', 'value').replace('[Function]', 'returns'));
        });
    
        it('When called without any context', () => {
            let args = {};
            expect(function() {returns(args);}).to.throw(errorNoMockerMsg);
        });
    });
});