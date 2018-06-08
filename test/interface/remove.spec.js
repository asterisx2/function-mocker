let should = require('chai').should();
let expect = require('chai').expect;
let srcFolder = '../../src/';
let remove = require(srcFolder + 'interface/remove');
let noMatchingArgs = require(srcFolder + 'utils/constants').values.error.noMatchingArgs;
let errorNoMockerMsg = require(srcFolder+'utils/constants').values.error.noMocker;

describe('remove', () => {
    let mocker = {
        _mocker_ : {
            data: {
                argsMap: {}
            }
        }
    };
    it('Should remove arguments mapping', () => {

        var someArgs = "someArgs";
        mocker._mocker_.data.argsMap[JSON.stringify([someArgs])] = {};

        remove.call(mocker, someArgs);
        
        mocker._mocker_.data
        .argsMap.hasOwnProperty(JSON.stringify(someArgs))
        .should.equal(false);
        
    });
    describe('Throws error', () => {
        it('When called without any context', () => {
            let args = {};
            expect(function() {
                remove(args);
            }).to.throw(errorNoMockerMsg);
        });
        it('When no mapping for arguments found', () => {
            let someOtherArgs = "someOtherArgs";
            expect(function() {
                remove.call(mocker, someOtherArgs);
            }).to.throw(noMatchingArgs);
            
        });
    }); 
});