let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let done = require(srcFolder + 'interface/done');
let errorNoMockerMsg = require(srcFolder + 'utils/constants').values.error.noMocker;

describe('done' , () => {
    let args = "args";
    let newMockData = {
        args: args,
        returnValue: {},
        ctx: {}
    };
    let mocker = {
        _mocker_ :{
            data:{
                argsMap: {},
                newMock: newMockData
            },
            done: function(){},
            callsFunc: function(){}
        }
        
    };
    it('Should set new mock data to argsmap for args key', () => {
        done.call(mocker);

        mocker._mocker_.data.argsMap[JSON.stringify(args)]
        .should
        .equal(newMockData);

        mocker._mocker_.data.newMock.should.eql({});
    });
    it('Should return proper properties', () => {
        let mocker = {
            _mocker_ :{
                data:{
                    argsMap: {},
                    newMock:{
                        args: 'someArgs',
                        returnValue: {},
                        ctx: {}
                    }
                },
                build: function(){},
                withArgs: function(){}
            }
        };
        let properties = ["build", "withArgs", "_mocker_"];
        let ret = done.call(mocker);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));
    
        ret.build.should.equal(mocker._mocker_.build);
        ret.withArgs.should.equal(mocker._mocker_.withArgs);
    });
    describe('Throws error', () => {
        it('When called without any context', () => {
            let args = {};
            expect(function() {done(args);}).to.throw(errorNoMockerMsg);
        });
    });
});