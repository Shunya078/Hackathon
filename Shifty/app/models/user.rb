class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :user_shift_forms
  has_many :user_shifts, through: :user_shift_forms

  enum gender: {male:1, female: 2}

  after_create do
    shift_weeks = ShiftWeek.recently_weeks
    shift_weeks.each do |shift_week|
      UserShiftForm.find_or_create_by(shift_week_id: shift_week.id, user_id: id).update(answer_limit: shift_week.end_date.ago(1.week))
    end
  end
end
