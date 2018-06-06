module.exports = {
    _isfunction_: function(o){
        return Object.prototype.toString.call(o) == '[object Function]';
    }
}