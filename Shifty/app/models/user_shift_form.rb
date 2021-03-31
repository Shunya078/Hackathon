class UserShiftForm < ApplicationRecord
  belongs_to :shift_week
  belongs_to :user
  has_many :user_shifts

  attr_accessor :new_shifts

  after_save do
    update_new_shifts
  end

  scope :on_recently_weeks, -> { joins(:shift_week).merge(ShiftWeek.recently_weeks) }

  def editable?
    return true if answer_limit.blank?
    Date.current <= answer_limit
  end

  def update_new_shifts
    return if new_shifts.blank?

    new_shifts.each do |date, new_shift_attrs|
      wanna_join = new_shift_attrs[:is_checked].to_s == 'true'
      _shift = user_shifts.find_by('date(start_datetime) = ?', date)

      Rails.logger.error date: date, wanna_join: wanna_join, _shift: _shift.present?

      if !wanna_join
        _shift.destroy if _shift
        next
      else
        _shift ||= user_shifts.build(start_datetime: Time.parse(%(#{date} #{new_shift_attrs[:start_hour]})))
      end

      _shift.update(
        end_datetime: Time.parse(%(#{new_shift_attrs[:end_date]} #{new_shift_attrs[:end_hour]}))
      )
    end
  end
end
