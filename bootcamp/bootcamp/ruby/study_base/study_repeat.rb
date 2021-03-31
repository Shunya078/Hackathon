# while
class While
  array = [0, 1, 2, 3, 4, 5, 6, 7]
  i = 0
  while i < array.length
    array[i] *= 2
    p array[i]
    i += 1
  end
end

# until
class Until
  array = [0, 1, 2, 3, 4, 5, 6, 7]
  i = 0
  until i >= array.length
    array[i] *= 3
    p array[i]
    i += 1
  end
end
