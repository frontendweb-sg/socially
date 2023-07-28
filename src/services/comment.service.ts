import { Api } from "@/axios-instance";
import { EStatus, IComment } from "@/models/post";
const API_URL_SERVICE = "/post";
class CommentService {
  getIntialObject() {
    return {
      message: "",
      avatar: "",
      status: "Pending",
      active: true,
      code: {
        language: "",
        language_code: "",
      },
      images: [],
    };
  }

  getCommentsByPostId(postId: string) {}
  getCommentsByUserId() {}
  addComment(postId: string, body: IComment) {
    return Api.post(API_URL_SERVICE + "/" + postId + "/comment", body);
  }
  deleteComment(postId: string, commentId: string) {
    return Api.delete(API_URL_SERVICE + "/" + postId + "/comment/" + commentId);
  }
}

const commentService = new CommentService();
export { commentService };
