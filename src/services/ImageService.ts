import ApiClient from "./ApiClient";
import { ImageInterface } from "@/interfaces/ImageInterface";

export default class ImageService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`image?skip=${skip}&take=${take}`);
  }

  getById(id: string) {
    return ApiClient.get(`image/${id}`);
  }

  create(image: ImageInterface, username?: string, password?: string) {
    return username && password
      ? ApiClient.post("image", image, { headers: { username, password } })
      : ApiClient.post("image", image);
  }

  update(id: string) {
    return ApiClient.put(`image/${id}`);
  }

  delete(id: string) {
    return ApiClient.delete(`image/${id}`);
  }

  pull(depID: string) {
    const url = "/Image";
    return ApiClient.post(url, { deployment: depID });
  }
}
