/**
 * Benchmark.js is a small JavaScript utility based on Ruby's Benchmark module. It 
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
    
    // What type of parameter was passed in (object, function, integer)
    type : null,
    
    // How many times to run the benchmark
    repeat : 1,
    
    // Number of characters in the longest result
    longest : 0,
    
    // Total time it took for all tests in a group
    total : 0.000000,
    
    // Benchmarks and their execution time
    results : {},
    
    // What will be displayed in STDOUT
    output : '',
    
    // Where to output the results, console by default
    STDOUT : console,
    
    /**
     * call-seq:
     *     Benchmark.initialize(options) --> Benchmark
     *
     * Sets up the Benchmark object. Not necessary unless you want to specify a custom STDOUT.
     *
     * Options
     * =======
     * `stdout`:    The object where you want results to go to, `console` by default. Must 
     *              implement a `log` method.
     */
    initialize : function(options) {
        this.STDOUT = options['stdout'];
        return this;
    },
    
    /**
     * call-seq:
     *     Benchmark.benchmark(function(){ }) --> Benchmark
     *     Benchmark.benchmark("label", function(){ }) --> Benchmark
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
        
        // Reset all attributes
        this.label   = null;
        this.repeat  = 1;
        this.longest = 0;
        this.results = {};
        this.type    = null;
        this.total   = 0.000000;

        switch( typeof args[0] ) {
            
            // Benchmark.benchmark("label", ...)
            case "string":
                this.type = "label";
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
                this.type = "repeat";
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
                this.type = "function";
                this.repeat = 1;
                this.label = null;
                measurement = [ args[0] ];
                break;
            
            // Run a series of benchmarks sequentially
            case "object":
                this.type = "bobject";
                this.repeat = 1;
                this.label = null;
                measurement = args[0];
                break;
            
            // Any other types are invalid
            default:
                this.type = "failure";
                this.repeat = 1;
                Error.throw( ArgumentError, "Invalid argument type." );
                return;
                break;
        }
        
        this.start( measurement );
        this.report();
        return this;
    },
    
    /**
     * Measures how long (in seconds) how long the `block` takes to run.
     *
     * Options
     * =======
     * `block`:    The function which contains the code to measure
     */
    measure : function(block) {
        start = new Date().getTime();
        block();
        end = new Date().getTime();
        
        this.total += (end - start) / 1000;
        return (end - start) / 1000;
    },
    

    // PRIVATE
        
    // Runs the list of measurements and records the results
    //
    start : function(measurements) {
        for (m in measurements) {
            label = (this.label) ? this.label : m;
            this.results[label] = 0;
            for (i = 0; i <= this.repeat; i++) {
                this.results[label] += parseFloat( this.measure( measurements[m] ));
            }
        }
    },
    
    // Formats the results into a way that can be displayed easily and user-friendly
    //
    format_results : function() {
        for (r in this.results) {
            this.results[r] = parseFloat( this.results[r] ).toString();
            if ( (r.length + this.results[r].length + 7) > this.longest ) { 
                this.longest = r.length + this.results[r].length + 7;
            }
        }
    },
    
    // Outputs the formatted results to STDOUT. By default, STDOUT is `console`.
    //
    report : function() {
        this.format_results();
        if (this.type == "bobject") { this.group_top_line(); }

        for ( r in this.results ) {
            var name = r.rjust(this.longest - 7);
            var time = ": (   " + this.results[r] + ")";
            this.output += ( name + time ).rjust( this.longest );
            this.output += "\n";
        }

        if (this.type == "bobject") { this.group_total_line(); }        
        
        this.STDOUT.log(this.output);
    },
    
    // Creates the top line of dashes for a sequential, object benchmark
    //
    group_top_line : function() {
        this.output += "-".repeat( this.longest + 5 );
        this.output += "\n";
    },
    
    // Creates the bottom line of dashes and the total time for a sequential, object benchmark.
    //
    group_total_line : function() {
        this.output += "-".repeat( this.get_padding() ) + " total: " + this.total + "";
    },
    
    // Calculates the padding needed to align results to the right.
    //
    get_padding : function() {
        padding = ( (this.longest + 5) - (this.total.toString().length + 8));
        padding = padding < 0 ? this.longest : padding;
        return padding;
    }
       
}