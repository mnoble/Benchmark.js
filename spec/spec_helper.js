SpecHelper = {
        
    multiple_benchmarks : {
        sort  : function() { for (i=0; i<100000000; i++) { } },
        splat : function() { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(function(value) { }); },
        cow   : function() { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(function(value) { }); },
        moodasdasdasdasd : function() { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(function(value) { }); }
    }
    
}

Output = function() { 
    
    this.messages = '';
    this.warnings = '';
    this.errors   = '';
    
    this.log = function(msg) { 
        this.messages += msg; 
    }
    
    this.warn = function(msg) {
        this.warnings += msg;
    }
    
    this.error = function(msg) {
        this.errors += msg;
    }
    
}