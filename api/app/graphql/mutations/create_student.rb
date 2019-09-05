module Mutations
  class CreateStudent < GraphQL::Schema::Mutation
    null true

    argument :student, Types::StudentInputType, required: true

    def resolve(student:)
      Student.create student.to_h
    end

  end
end