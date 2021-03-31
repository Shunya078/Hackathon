def hoge(x, y = 1)
  10 * x + y
end
p hoge(2, 5) # => 25
p hoge(3) # => 31

$gvar = 3
def fuga(x, y = $gvar)
  10 * x + y
end
$gvar = 7
p fuga(5) # => 57

def hoge(x, *xs)
  puts "#{x} : #{xs.inspect}"
end
hoge(1) # => 1 : []
hoge(1, 2) # => 1 : [2]
hoge(1, 2, 3) # => 1 : [2, 3]

# 残りの引数全てを無視するようになる
def fuga(x, *)
  puts "#{x}"
end
fuga(1) #=> 1
fuga(1, 2) #=> 1
fuga(1, 2, 3) #=> 1

def hoge
  'hoge'
end

alias _before_hoge hoge

def hoge
  _before_hoge * 2
end

p hoge # => "hogehoge"
