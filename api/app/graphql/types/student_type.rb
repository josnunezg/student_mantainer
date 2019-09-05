module Types
  class StudentType < Types::BaseObject
    description "An student"

    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :rut, String, null: true
    field :list_number, Int, null: true
    field :is_present, Boolean, null: true
    field :full_name, String, null: true
  end

  class StudentInputType < GraphQL::Schema::InputObject
    graphql_name "StudentInputType"
    description "All attributes for mutation an student"

    argument :id, ID, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :rut, String, required: false
    argument :list_number, String,required: false
    argument :is_present, Boolean, required: false
  end
end