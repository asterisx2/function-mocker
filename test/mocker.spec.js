let mocker = require('../src/mocker');

describe('Mocker', () => {
    it('Should just work', () => {
        var obj = {
            me: "Obj"
        };
        var obj2 = {
            me: "Obj2"
        };
        let helloFunc = function(){console.log("1 Hello from "+this.me)};
        let helloFunc2 = function(){console.log("2 Hello from "+this.me)};
        var ret = "Hello from return";
        let args = ['Some Args', 1, 2];
        let args2 = "args2";
        let args3 = "arg3";
        let args4 = "args4";
        let ret2 = "Some other value";

        let mock = mocker.new();
        
        mock = mock.withArgs(args).withCtx(obj).returns(ret).callsFunc(helloFunc, helloFunc2).finish();
       
        mock = mock.withArgs(args2).returns(ret2).finish();

        mock = mock.withArgs(args3).withCtx(obj2).callsFunc(helloFunc, helloFunc2).finish();

        mock = mock.withArgs(args4).callsFunc(helloFunc, helloFunc2).finish();
        
        let func = mock.build();

        func(args).should.equal(ret);
        func(args2).should.equal(ret2);

        func(args3);
        func(args4);
    });
})