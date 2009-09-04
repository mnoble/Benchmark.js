describe 'String'  

  it 'should repeat itself `n` number of times'
    "a".repeat(5).should.equal "aaaaa"
  end
  
  it 'should right justify to `n` spaces'
    "hello".rjust(10).should.equal "     hello"
  end
  
end