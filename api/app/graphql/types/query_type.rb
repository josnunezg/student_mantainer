module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :student, Types::StudentType, null: true, description: "One Student" do
      argument :id, ID, required: true
    end

    def student(id:)
      Student.find_by_id(id)
    end

    field :students, [Types::StudentType], null: false, description: "All students"

    def students
      Student.all
    end
  end
end
