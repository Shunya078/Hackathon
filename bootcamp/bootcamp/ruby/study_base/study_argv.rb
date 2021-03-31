class NumberOfOddOrEven
  def check(n)
    if n % 2 == 0
      puts '偶数です'
    else
      puts '奇数です'
    end
  end

  puts check(ARGV[0].to_i)
end
