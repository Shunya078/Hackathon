class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  # after_action :set_shift, only:[:create]

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name]) # 新規登録時(sign_up時)にnameというキーのパラメーターを追加で許可する
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:gender])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:miseinen])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:tencho_bool])
  end

  # def set_shift
  #   shift_weeks = ShiftWeek.first(2)
  #   shift_weeks.each do |shift_week|
  #     p shift_week.id
  #     UserShiftForm.find_or_create_by(shift_week_id: shift_week.id, user_id: current_user.id).update(answer_limit: Date.new(2020, 6, 29))
  #   end
  # end
end
