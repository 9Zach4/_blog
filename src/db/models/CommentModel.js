import BaseModel from "./BaseModel"

class CommentModel extends BaseModel {
  static tableName = "comments"

  static jsonSchema() {
    return {
      type: "object",
      required: ["content", "postId", "userId"],

      properties: {
        id: { type: "integer" },
        content: { type: "string", minLength: 1 },
        userId: { type: "integer" },
        postId: { type: "integer" },
      },
    }
  }
 
  static get relationMapping() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "UserModel",
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: "PostModel",
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel