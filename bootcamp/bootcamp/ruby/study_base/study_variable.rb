# local_variable
v = 0

1.times do
  p defined?(v) # => nil
  v = 1
  p v # => 1
end

# p v # => undefined error

# instance_variable
@v = 0

1.times do
  p defined?(@v) # => "instance-variable"
  p @v # => 0
end

# class_variable
class Hoge
  @@hogehoge = 1
end

class Fuga < Hoge
  p @@hogehoge += 1 # => 2
end

class Piyo < Fuga
  p @@hogehoge += 1 # => 3
end

# global_variable
$hoge = 'hoge'
p $hoge

class HogeHoge
  $hoge = 'fuga'
  p $hoge
end
