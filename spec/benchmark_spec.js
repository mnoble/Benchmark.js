describe 'Benchmark'
  
  before
    Output = function() { this.messages = ''; this.log = function(msg) { this.messages += msg; }}
  end
  
  before_each
    Benchmark.initialize({ stdout: new Output() })
  end
  
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
  
  it 'should run a simple measurement'
    Benchmark.benchmark(function() { for (i in 100000000) {} })
    Benchmark.STDOUT.messages.should.not.be_empty
  end
  
  it 'should display a label when given one'
    Benchmark.benchmark('Measurement name', function() { for (i in 100000000) {} })
    Benchmark.STDOUT.messages.should.match /Measurement name/
  end
  
  it 'should repeat a test n number of times'
    Benchmark.benchmark(1000, function() { for (i in 100000000) {} })
    Benchmark.repeat.should.be 1000
  end

end