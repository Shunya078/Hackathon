hash = { 'one' => 1, 'two' => 2, 'three' => 3 }
puts hash['one']

hash.each_pair { |key, value| puts "#{key} = #{value}" }
