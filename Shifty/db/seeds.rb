# 1.upto(10) do |i|
#   User.find_or_initialize_by(email: %(dm#{i}@ga-tech.co.jp))
#       .update!(password: '123456', password_confirmation: '123456', name: %(User#{i}), nickname: %(U#{i}), miseinen: '1998-06-25')
# end

date = Date.new(2020, 6, 29)

until date >= Date.new(2030, 1, 1)
  start_date = date.beginning_of_week
  end_date = date.end_of_week
  ShiftWeek.find_or_create_by(start_date: start_date, end_date: end_date)

  date = end_date.tomorrow
end

shift_weeks = ShiftWeek.first(2)
users = User.all
shift_weeks.each do |shift_week|
  users.each do |user|
    UserShiftForm.find_or_create_by(shift_week_id: shift_week.id, user_id: user.id).update(answer_limit: Date.new(2020, 6, 29))
  end
end