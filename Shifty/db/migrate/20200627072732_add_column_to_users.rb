class AddColumnToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :nickname, :string
    add_column :users, :gender, :string
    add_column :users, :miseinen, :bool
  end
end
