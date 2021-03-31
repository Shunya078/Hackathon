class AddUserShiftFormIdToUserShifts < ActiveRecord::Migration[6.0]
  def change
    add_reference :user_shifts, :user_shift_form, null: false, index: true, foreign_key: true
    remove_column :user_shifts, :user_id
  end
end
