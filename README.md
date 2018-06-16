# function-mocker
A declarative JavaScript function mocker for rapid prototyping.

Maps function calls with args. Function calls can return values, call other functions, with or without context and arguments.

# Return a value?
```javascript
let mock = mocker.mock();
mock.withArgs(someArgs).returns(someReturnValue).done();
let func = mock.build();
func(someArgs) -> returns someReturnValue
```
# Call external functions?
```javascript
let mockFunc = mock.withArgs(someArgs).callsFunc(afunction).done().build();
mockFunc(someArgs); -> calls afunction
```    
## With context? 
```javascript 
let mockFunc = mock.withArgs(someArgs).callsFunc(afunction).withCtx(ctx).done().build();
mockFunc(someArgs); -> calls function afunction with "this" set to ctx
```    
## With Args?
```javascript 
let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, funcArgs).done().build();
mockFunc(someArgs); -> calls function afunction with funcArgs
```    
## Multiple functions?
```javascript 
let mockFunc = mock.withArgs(someArgs).callsFunc(afunction, bfunction).done().build();
mockFunc(someArgs); -> calls afunction, bfunction
```   

# Remove a mapping?
```javascript
mock.remove(someArgs) -> removes mapping for someArgs
```
