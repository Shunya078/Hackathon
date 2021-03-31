class UserShiftFormsController < ApplicationController


  def edit
    @user_shift_form = UserShiftForm.find_by(id: params[:id])
    shift_week = @user_shift_form.shift_week
    @start_date = shift_week.start_date
    @end_date = shift_week.end_date
    @user_shifts = @user_shift_form.user_shifts
  end

  def update
    @user_shift_form = UserShiftForm.find_by(id: params[:id])
    if @user_shift_form.update(user_shift_form_params)
      flash[:notice] = "シフトの提出が完了しました"
      redirect_to mypage_user_path(current_user)
    end
  end


  private

  def user_shift_form_params
    params.require(:user_shift_form).permit(:id, new_shifts: {})
  end
end
