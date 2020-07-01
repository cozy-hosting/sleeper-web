import ApiClient from "./ApiClient";
import {
  ImageInterface,
  ImageGetAllResponse,
  ImageGetByIdResponse
} from "@/interfaces/Image/ImageInterface";
import { AxiosResponse } from "axios";

export default class ImageService {
  getAll(
    skip: number,
    take: number
  ): Promise<AxiosResponse<ImageGetAllResponse>> {
    return ApiClient.get(`image?skip=${skip}&take=${take}`);
  }

  getById(id: string): Promise<AxiosResponse<ImageGetByIdResponse>> {
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
