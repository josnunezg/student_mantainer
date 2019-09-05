module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :create_student, Types::StudentType, mutation: Mutations::CreateStudent
    field :update_student, mutation: Mutations::UpdateStudent
    field :delete_student, mutation: Mutations::DeleteStudent
  end
end
