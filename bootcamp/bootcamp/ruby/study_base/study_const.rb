class Hoge
  HOGE = 'HOGE'
end

class Fuga < Hoge
  FUGA = 'FUGA'
  p HOGE # => HOGE
  class Piyo
    p FUGA # => "FUGA"
  end
end
