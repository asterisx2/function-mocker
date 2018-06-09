let errorNoMockerMsg = require('../utils/constants').values.error.noMocker;

module.exports = function(args) {

        if(!this._mocker_)
            throw(errorNoMockerMsg);
        
        let key = JSON.stringify(args);
        let data = this._mocker_.data;
        
        let mappedCall = data.argsMap[key];
        
        let functions = mappedCall.functions;       

        functions.forEach(funcSet => {
            funcSet.funcs.forEach(func => {
                if(funcSet.ctx)
                    if(funcSet.args)
                        func.call(funcSet.ctx, funcSet.args);
                    else
                        func.call(funcSet.ctx);
                else
                    if(funcSet.args)
                        func(funcSet.args);
                    else
                        func();
            });
         
        });

        if(mappedCall.returnValue)
            return mappedCall.returnValue;
            
};