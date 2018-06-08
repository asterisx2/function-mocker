let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let withArgs = require(srcFolder + 'interface/withArgs');
let errorNoArgMsg = require(srcFolder + 'utils/constants').values.error.noArgs;
let errorNoMockerMsg = require(srcFolder + 'utils/constants').values.error.noMocker;

describe('withCtx', () => {
    let mocker = {
        _mocker_ :{
            data:{
                argsMap: {},
                newMock:{
                    ctx: {}
                }
            },
            returns: function(){},
            callsFunc: function(){}
        }
        
    };
    it('Should add args to a new mock call', () => {
      
        let args = {someArgs: 'someArgs'};
        withArgs.call(mocker, args);
        //args are ... to an array, gets the first one 
        mocker._mocker_.data.newMock.args[0].should.eql(args);
    
    });
    it('Should return proper properties', () => {
        let properties = ["returns", "callsFunc", "_mocker_"];
        let ctx = {};
        let ret = withArgs.call(mocker, ctx);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));
    
        ret.returns.should.equal(mocker._mocker_.returns);
        ret.callsFunc.should.equal(mocker._mocker_.callsFunc);
    });
    describe('Throws error', () => {
        it('When called with no arguments passed', () => {
            expect(withArgs).to.throw(errorNoArgMsg.replace('[Args]', 'args').replace('[Function]', 'withArgs'));
        });
    
        it('When called without any context', () => {
            let args = {};
            expect(function() {withArgs(args);}).to.throw(errorNoMockerMsg);
        });
    });
    
});