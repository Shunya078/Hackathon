# Shikitenkai
class Shikitenkai
  hoge = 'HOGE'
  p "my name is #{hoge}" #=> "my name is HOGE"
  p 'my name is #{hoge}' #=> "my name is \#{$ruby}"
end

# HearDocument
print <<HOGE
  the string
  next line
HOGE

print "the string \n next line \n"

# % notation
class Array
  array = %w[hoge fuga piyo]
  p array[1] # => fuga
end
