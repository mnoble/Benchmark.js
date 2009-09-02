String.prototype.repeat = function(num){
    return new Array( num + 1 ).join( this );
}

String.prototype.rjust = function(width, padding) {
    padding = padding || " ";
    padding = padding.substr(0, 1);
    
    if (this.length < width)
        return padding.repeat(width - this.length) + this;
    else
        return this;
}

Number.prototype.precise = function(number) {
    var len    = this.toString().length;
    var up     = false;
    var result = '';
    
    for (var i = len - 1; i >= 4; i--) {
        if (up == true) {
            result = (parseInt(this.toString()[i]) + 1) + result;
        } else {
            result = this.toString()[i] + result;
        }
        
        if (parseInt(this.toString()[i]) >= 5) {
            up = true;
        } else {
            up = false;
        }
    }
    
    console.log(this.toString().substring(0, 3) + result);
}