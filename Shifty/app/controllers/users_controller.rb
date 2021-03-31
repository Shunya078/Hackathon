class UsersController < ApplicationController
  def mypage
    if params[:id].to_s == current_user.id.to_s
      @user_shift_forms = current_user.user_shift_forms.on_recently_weeks
    else
      redirect_to mypage_user_path(current_user), alert: '他人のマイページを見ることができません。'
    end
  end
end
