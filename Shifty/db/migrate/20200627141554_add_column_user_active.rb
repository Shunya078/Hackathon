class AddColumnUserActive < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :active, :boolean, default: true, null: false
    add_column :users, :tencho_bool, :boolean, default: false, null: false
  end
end
