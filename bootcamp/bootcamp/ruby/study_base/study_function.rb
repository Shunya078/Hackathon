class Hoge
  hoge = 1
  p hoge.to_s # => "1"
  fuga = 2
  p fuga&.to_s # => "2"
  piyo = nil
  p piyo&.to_s # => "nil"
end

class Yield
  def hoge
    yield(1, 2)
  end

  hoge { |a, b| p [a, b] } #=> [1, 2]

  hoge { |a, b| p a + b } # => 3

  def fuga
    yield 10
    yield 20
    yield 30
  end

  fuga { |v| p v + 1 }
  # => 11
  # => 21
  # => 31
end
