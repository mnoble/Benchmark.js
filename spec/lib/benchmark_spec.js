describe 'Benchmark'
  
  before
    helper = SpecHelper
  end
  
  after
    if (console) { console.log(Benchmark.STDOUT.messages) }
  end
  
  before_each
    Benchmark.initialize({ stdout: new Output() })
  end
  
  it 'should alias the benchmark() method as bm()'
    Benchmark.bm(function() {})
    Benchmark.STDOUT.messages.should.not.be_empty
  end

  describe 'being created'
  
      it 'should be an object'
        typeof Benchmark.should.be "object"
      end
  
      it 'should allow the user to specify STDOUT'
        Benchmark.STDOUT.should.be_an Output
      end
  
      it 'should output to the STDOUT passed into initialize'
        Benchmark.benchmark(function() {})
        Benchmark.STDOUT.messages.should.not.be_empty
      end
  
  end
  
  describe 'measurement types'
  
    it 'should run a simple measurement'
      Benchmark.benchmark(function() { for (i in 100000000) {} })
      Benchmark.STDOUT.messages.should.not.be_empty
    end

    it 'should repeat a test `n` number of times'
      Benchmark.benchmark(1000, function() { for (i in 100000000) {} })
      Benchmark.repeat.should.be 1000
    end
    
    it 'should run a group of measurements'
      Benchmark.benchmark({
          simple_for_loop   : function() { for (var i=0; i < 1000000; i++) { }; },
          improved_for_loop : function() { for (var i=1000000; i >= 1000000; i--) { }; }
      })
      Benchmark.STDOUT.messages.should.match /Simple For Loop:/
      Benchmark.STDOUT.messages.should.match /Improved For Loop:/
    end
    
  end
  
  describe 'displaying output'
    
    it 'should display a label when given one'
      Benchmark.benchmark('Measurement name', function() { for (i in 100000000) {} })
      Benchmark.STDOUT.messages.should.match /Measurement name/
    end
    
    it 'should display a label and run `n` number of times'
      Benchmark.benchmark('For loop 1000 times', 1000, function() { for (i in 100000000) {} })
      Benchmark.repeat.should.be 1000
      Benchmark.STDOUT.messages.should.match /For loop 1000 times: \(   \d\.\d\d\d\)/
    end
    
    it 'should display the total execution time if given an object'
      Benchmark.benchmark(helper.multiple_benchmarks)
      Benchmark.STDOUT.messages.should.match /total/
    end
    
    it 'should format results to 3 decimal places'
      Benchmark.benchmark(function() { for (i in 100000000) {} })
      Benchmark.STDOUT.messages.should.match /^\s*\(   \d\.\d\d\d\)/
    end
    
  end

end