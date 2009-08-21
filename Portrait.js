/**
 * Portrait is a small JavaScript benchmarking utility. It's based on Ruby's
 * Benchmark module. It allows you to measure and display how long it takes
 * to execute a block of JavaScript code. Note: Times are measured in seconds.
 *
 * + Measure how long it takes a `for` loop to iterate 10,000,000 times
 *
 *       Portrait.benchmark(function() {
 *           for (i = 0; i < 10000000; i++) { }
 *       });
 *
 *   Outputs:
 *       (  7.149000)
 *
 * + Measure something and give it a label
 *
 *       Portrait.benchmark("Iterate 10000000 times", function() {
 *           for (i = 0; i < 10000000; i++) { }
 *       });
 *       
 *   Outputs:
 *       Iterate 10000000 times: (   7.149000)
 *
 * + Measure things sequentially
 *
 *       tests = { toSource : function() { Object.toSource(); },
 *                 toString : function() { 123456.toString(); } }
 *       Portrait.benchmark(tests)
 *
 *   Outputs:
 *       -----------------------
 *       toSource: (   0.123000)
 *       toString: (   1.712000)
 *       ------- total: 1.835000
 *
 */
Portrait = {
    
    // Label for the benchmark
    label : '',
    
    // Execution timer
    timer : { start : 0 },
    
    /**
     * call-seq:
     *     Portrait.benchmark(function(){ })
     *     Portrait.benchmark("label", function(){ })
     *
     * Invokes the measurement function and records how long it takes to complete the operation.
     * Arguments can either be in the order of `label, function` or simply `function` if you 
     * don't want to see a label.
     *
     * Options
     * =======
     *     label (optional):   The label that will be shown next to the results of the measurement
     *     measurement:        What you want to benchmark, in the form a `function`
     *
     *     
     */
    benchmark : function(label, measurement) {
        args = arguments;
        switch( typeof args[0] ) {
            
            case "string":
                this.label = args[0];
                if ( typeof args[1] == "function" ) {
                    this.single_measurements( args[1] );
                } else {
                    Portrait.Error.throw( ArgumentError, "Second argument must be of type 'function'" );
                }
                break;
            
            case "function":
                this.single_measurement( args[0] );
                break;
            
            // If it's none of the above, it's not correct.
            default:
                Portrait.Error.throw( ArgumentError, "Invalid argument type." );
                break;
        }
        
        this.report();
        return this;
    },
    
    single_measurement : function(measurement) {
        this.results[0] = this.measure( measurement );
    },
    
    multiple_measurements : function(measurements) {
        for ( m in measurements ) {
            this.results[m] = this.measure( measurements[m] );
        }
    },
    
    measure : function(block) {
        start = new Date().getTime();
        block();
        end   = new Date().getTime();
        return ((end - start) / 1000).toPrecision(7);
    }
    
}