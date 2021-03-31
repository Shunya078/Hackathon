class UserShift < ApplicationRecord
  belongs_to :user_shift_form

  def setup_on?(date)
    start_date >= date && end_date <= date
  end

  def start_date
    start_datetime.to_date
  end

  def end_date
    end_datetime.to_date
  end

  def start_hour
    start_datetime.strftime('%H')
  end

  def end_hour
    end_datetime.strftime('%H')
  end

  def overnight?
    start_date != end_date
  end

  def calender_json
    {
      id: id,
      title: user_shift_form.user.name,
      start: start_datetime,
      end: end_datetime
    }
  end
end