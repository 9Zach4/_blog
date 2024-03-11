import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"

class PostModel extends BaseModel {
  static tableName = "posts"

  static jsonSchema = {
    type: "object",
    required: ["title", "content", "authorId"],

    properties: {
      id: { type: "integer" },
      title: { type: "string", minLength: 1 },
      content: { type: "string", minLength: 1 },
      authorId: { type: "integer" },
    },
  }


  static get relationMappings() {
    return {
      author: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.authorId",
          to: "users.id",
        },
      },
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: "CommentModel",
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    }
  }
}

export default PostModel
