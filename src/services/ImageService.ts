import ApiClient from './ApiClient';
import { ImageInterface } from "@/interfaces/ImageInterface";


export default class ImageService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`image?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiClient.get(`image/${id}`);
  }

  public create(image: ImageInterface, username?: string, password?: string) {
    return username && password
      ? ApiClient.post('image', image, { headers: { username, password } })
      : ApiClient.post('image', image);
  }

  public update(id: number) {
    return ApiClient.put(`image/${id}`);
  }

  public delete(id: number) {
    return ApiClient.delete(`image/${id}`);
  }

  public pull(depID: string) {
    const url = "/Image";
    return ApiClient.post(url, { deployment: depID });
  }
}

