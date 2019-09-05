class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.string :rut
      t.integer :list_number
      t.boolean :is_present

      t.timestamps
    end
  end
end
