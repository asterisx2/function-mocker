let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let mock = require(srcFolder + 'interface/mock');
let errorNoMockerMsg = require(srcFolder + 'utils/constants').values.error.noMocker;

describe('remove', () => {
    let mocker = {
            build: function(){},
            withArgs: function(){}
    };
    it('Should return proper properties', () => {
        let properties = ["build", "withArgs", "_mocker_"];
        let ret = mock.call(mocker);
        Object.getOwnPropertyNames(ret).length.should.equal(properties.length);
        properties.forEach(prop => Object.getOwnPropertyNames(ret).indexOf(prop).should.not.equal(-1));
    
        ret.build.should.equal(mocker.build);
        ret.withArgs.should.equal(mocker.withArgs);
    });
});