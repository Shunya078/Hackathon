class CreateUserShiftForms < ActiveRecord::Migration[6.0]
  def change
    create_table :user_shift_forms do |t|
      t.integer :shift_week_id
      t.integer :user_id
      t.date :answer_limit
      t.date :answered_at

      t.timestamps
    end
  end
end
