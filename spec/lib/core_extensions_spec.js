describe 'String'  

  it 'should repeat itself `n` number of times'
    "a".repeat(5).should.equal "aaaaa"
  end
  
  it 'should right justify to `n` spaces'
    "hello".rjust(10).should.equal "     hello"
  end
  
  it 'should convert underscores to spaces'
    "this_is_a_sentence".spacify().should.equal "This Is A Sentence"
  end
  
  it 'should escape double underscores'
    "this__is__a__sentance".spacify().should.equal "this_is_a_sentance"
  end
  
  it 'should conver a mix of underscores and escaped underscores'
    "this__is_a__sentence".spacify().should.equal "this_is a_sentence"
  end
  
end