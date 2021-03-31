class ChangeDatatimeToUsershift < ActiveRecord::Migration[6.0]
  def change
    change_column :user_shifts, :start_datetime, :datetime
    change_column :user_shifts, :end_datetime, :datetime
  end
end
