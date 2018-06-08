module.exports = function() {
   
    let ret = {};
    let context = this;

    Object.defineProperty(ret, '_mocker_', {
        value: context,
        enumerable: false
    });

    ret.build = context.build;
    ret.withArgs = context.withArgs;

    return ret; 
};