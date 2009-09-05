Exception = {
    
    STDOUT : console,
    
    initialize : function(options) {
        if ( options['stdout'] ) { this.STDOUT = options['stdout']; }
        return this;
    },
    
    throw : function(error, message) {
        message = (typeof message == 'undefined') ? '' : ": " + message;
        this.STDOUT.error(error + message);
    }
    
}