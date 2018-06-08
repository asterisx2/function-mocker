let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let build = require(srcFolder+'interface/build');
let errorNoMockerMsg = require(srcFolder+'utils/constants').values.error.noMocker;

describe('build', () => {
    let funcArgs = {};  
    let mocker = {
        _mocker_ : {
            invoke: function(args){
                this.should.eql(mocker);
                args[0].should.eql(funcArgs);
            }
        }
    };
    it('Should return a callable function with mocker context and args', () => {
        let func = build.call(mocker);
        func(funcArgs);
    });
    it('Should throw an error if not called with correct context', () => {
        let obj = {};
        expect(function() {build(obj);}).to.throw(errorNoMockerMsg);
    });
});