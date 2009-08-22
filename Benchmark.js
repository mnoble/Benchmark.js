/**
 * Benchmark is a small JavaScript utility based on Ruby's Benchmark module. It 
 * allows you to measure and display how long it takes to execute a block of 
 * JavaScript code. Note: Times are measured in seconds.
 *
 * + Measure how long it takes a `for` loop to iterate 10,000,000 times
 *
 *       Benchmark.benchmark(function() {
 *           for (i = 0; i < 10000000; i++) { }
 *       });
 *
 *   Outputs (for me):
 *       (  7.149000)
 *
 * + Measure how long it takes to assign a variable to "something" one million times
 *
 *       Benchmark.benchmark(1000000, function() {
 *           var foo = "something";
 *       });
 *       
 *   Outputs:
 *       Iterate 10,000,000 times: (   7.149000)
 *
 
 * + Measure something and give it a label
 *
 *       Benchmark.benchmark("Iterate 10,000,000 times", function() {
 *           for (i = 0; i < 10000000; i++) { }
 *       });
 *       
 *   Outputs:
 *       Iterate 10,000,000 times: (   7.149000)
 *
 * + Measure things sequentially
 *
 *       tests = { toSource : function() { Object.toSource(); },
 *                 toString : function() { 123456.toString(); } }
 *       Benchmark.benchmark(tests)
 *
 *   Outputs:
 *       -----------------------
 *       toSource: (   0.123000)
 *       toString: (   1.712000)
 *       ------- total: 1.835000
 *
 */
Benchmark = {
    
    // Label for the benchmark
    label : null,
    
    // How many times to run the benchmark
    repeat : 1,
    
    // Benchmarks and their execution time
    results : {},
    
    /**
     * call-seq:
     *     Benchmark.benchmark(function(){ })
     *     Benchmark.benchmark("label", function(){ })
     *
     * Invokes the measurement function and records how long it takes to complete the operation.
     * Arguments can either be in the order of `label, function` or simply `function` if you 
     * don't want to see a label.
     *
     * Options
     * =======
     * `label` (optional):   The label that will be shown next to the results of the measurement
     * `measurement`:        What you want to benchmark, in the form a `function`
     */
    benchmark : function(label, measurement) {
        args = arguments;

        switch( typeof args[0] ) {
            
            // Benchmark.benchmark("label", ...)
            case "string":
                this.label = args[0];
                // Benchmark.benchmark("label", 1000, ...)
                if ( typeof args[1] == "number" ) {
                    this.repeat = args[1];
                    
                    // Benchmark.benchmark("label", 1000, function(){ })
                    if ( typeof args[2] == "function") {
                        measurement = [ args[2] ];
                    } else {
                        Error.throw( ArgumentError, "Third argument must be a function" );
                        return;
                    }
                
                } else {
                    
                    // Benchmark.benchmark("label", function(){ })
                    if ( typeof args[1] == "function") {
                        measurement = [ args[1] ];
                    } else {
                        Error.throw( ArgumentError, "Third argument must be a function" );
                        return;
                    }
                    
                }
                break;
            
            // Repeat the benchmark 1000 times and total up how long each one took.
            // Benchmark.benchmark(1000, function(){ })
            case "number":
                this.repeat = args[0];
                if (typeof args[1] == "function") {
                    measurement = [ args[1] ];
                } else {
                    Error.throw( ArgumentError, "Second argument must be a function" );
                    return;
                }
                break;
            
            // Run a single benchmark only outputing the execution duration
            case "function":
                this.label = null;
                measurement = [ args[0] ];
                break;
            
            // Run a series of benchmarks sequentially
            case "object":
                this.label = null;
                measurement = [ args[0] ];
                break;
            
            // Any other types are invalid
            default:
                Error.throw( ArgumentError, "Invalid argument type." );
                return;
                break;
        }
        
        this.start( measurement );
        this.report();
    },
    
    start : function(measurements) {
        for (m in measurements) {
            this.results[m] = parseFloat(0);
            for (i = 0; i <= this.repeat; i++) {
                console.log("Testing...");
                this.results[m] += parseFloat( this.measure( measurements[m] ));
            }
        }
    },
    
    measure : function(block) {
        start = new Date().getTime();
        block();
        end = new Date().getTime();
        return ((end - start) / 1000).toPrecision(7);
    },
    
    report : function() {
        printline = '';
        if (this.results[0]) {
            if (this.label) {
                printline += this.label + ": ";
            }
            console.log( printline + "(   " + this.results[0] + ")" );
        } else {
            // MAKE "----" stretch the length of longest results line
            for (r in this.results) {
                console.log( r + ": (   " + this.results[r] + ")" );
            }
        }
    }
    
}