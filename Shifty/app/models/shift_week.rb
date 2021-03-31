class ShiftWeek < ApplicationRecord
  has_many :user_shift_forms

  scope :recently_weeks, -> {
    start_date = Date.current.beginning_of_week.ago(1.week)
    end_date = Date.current.end_of_week.since(3.weeks)
    where('start_date >= ? and end_date <= ?', start_date, end_date)
  }
end
