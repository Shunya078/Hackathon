class WorkShiftTableController < ApplicationController

  def home
  end

  def members
    date_format = '%Y%m%d'
    age = (Date.current.strftime(date_format).to_i - Date.yesterday.strftime(date_format).to_i) / 10_000
    @users = User.all
  end

end
