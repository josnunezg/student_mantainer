module Mutations
  class UpdateStudent < GraphQL::Schema::Mutation
    null false

    argument :student, Types::StudentInputType, required: true

    type Boolean

    def resolve(student:)
      _student = Student.find_by_id(student[:id])
      _student&.update student.to_h
    end

  end
end