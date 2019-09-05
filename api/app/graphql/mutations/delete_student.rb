module Mutations
  class DeleteStudent < GraphQL::Schema::Mutation
    null false

    argument :id, ID, required: true

    type Boolean

    def resolve(id:)
      student = Student.find_by_id(id)
      student&.destroy
    end

  end
end