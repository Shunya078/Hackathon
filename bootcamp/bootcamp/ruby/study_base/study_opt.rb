require 'optparse'

class Opt
  opt = OptionParser.new

  params = {}

  opt.on('-a') { |v| params[:a] = v }
  opt.on('-b') { |v| params[:b] = v }

  opt.parse!(ARGV)
  p ARGV # => ["hoge", "fuga"]
  p params # => {:a=>true, :b=>true}
end
