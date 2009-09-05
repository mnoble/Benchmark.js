describe 'Exception'

    it 'should exist'
      Exception.should_not.be undefined
    end
    
    it 'should implement a `throw` method'
      typeof Exception.throw.should.be 'function'
    end
    
    it 'should set `STDOUT` if initialized with one'
      Exception.initialize({stdout: new Output()}).STDOUT.should.be_an Output
    end
    
    it 'should display the error type'
      Exception.throw('ArgumentError')
      Exception.STDOUT.errors.should.match /ArgumentError/
    end
    
    it 'should display the error message'
      Exception.throw('ArgumentError', 'Expecting 2 parameters but received 1.')
      Exception.STDOUT.errors.should.match /Expecting 2 parameters but received 1/
    end
  
end