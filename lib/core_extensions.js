String.prototype.repeat = function(num){
    return new Array( num + 1 ).join( this );
}

String.prototype.rjust = function(width, padding) {
    padding = padding || " ";
    padding = padding.substr(0, 1);
    
    if (this.length < width) {
        return padding.repeat(width - this.length) + this;
    } else {
        return this;
    }
}