class Student < ApplicationRecord

  validates_presence_of :rut

  def full_name
    "#{first_name} #{last_name}"
  end

end
