let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let withCtx = require(srcFolder+'interface/withCtx');
let errorNoArgMsg = require(srcFolder+'utils/constants').values.error.noArgs;
let errorNoMockerMsg = require(srcFolder+'utils/constants').values.error.noMocker;

describe('withCtx', () => {
    let mocker = {
        _mocker_ :{
            data:{
                newMock:{
                    ctx: {},
                    functions: [{funcs: [], args: {}, ctx: {}}]
                }
            },
            done: function(){},
            callsFunc: function(){}
        }
        
    };
    it('Should add ctx to function calls', () => {
      
        let ctx = {};
        withCtx.call(mocker, ctx);
        mocker._mocker_.data.newMock.functions[0].ctx.should.eql(ctx);
    
    });
    it('Should return proper properties', () => {
        let properties = ["done", "callsFunc", "_mocker_"];
        let ctx = {};
        let ret = withCtx.call(mocker, ctx);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));
    
        ret.done.should.equal(mocker._mocker_.done);
        ret.callsFunc.should.equal(mocker._mocker_.callsFunc);
    });
    describe('Throws error', () => {
        it('When called with no arguments passed', () => {
            expect(withCtx).to.throw(errorNoArgMsg.replace('[Args]', 'ctx').replace('[Function]', 'withCtx'));
        });
    
        it('When called without any context', () => {
            let args = {};
            expect(function() {withCtx(args);}).to.throw(errorNoMockerMsg);
        });
    });
    
});