import { IError } from "@/app/api/errors/custom-error";
import { Api } from "@/axios-instance";
import { IPost, IPostDoc } from "@/models/post";
import type { AxiosResponse } from "axios";

const API_URL_SERVICE = "/post";

/**
 * Post service
 */
class PostService {
  getIntialData() {
    return {
      id: 0,
      user: "",
      content: "",
      code: ".css",
      privacy: "friends",
      active: true,
      shares: 0,
      tags: [],
      media: [],
      attachments: [],
      comments: [],
      likes: [],
      isFeature: false,
      isRecent: false,
    };
  }

  async getAll(): Promise<IPostDoc[] | undefined> {
    try {
      const response = await Api.get(API_URL_SERVICE);
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  add(body: any): Promise<AxiosResponse<IPost | { errors: IError }>> {
    return Api.post(API_URL_SERVICE, body);
  }
  update(body: IPostDoc): Promise<AxiosResponse<IPost>> {
    return Api.put(API_URL_SERVICE + "/" + body.id, body);
  }
  delete(id: string): Promise<AxiosResponse<IPost>> {
    return Api.delete(API_URL_SERVICE + id);
  }
}

const postService = new PostService();
export { postService };
