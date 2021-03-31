class CreateUserShifts < ActiveRecord::Migration[6.0]
  def change
    create_table :user_shifts do |t|
      t.integer :user_id
      t.date :start_datetime
      t.date :end_datetime

      t.timestamps
    end
  end
end
