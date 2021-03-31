class ChangeDataBirthdayToUser < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :miseinen, :date
    change_column :users, :gender, :integer, default: 0
  end
end
