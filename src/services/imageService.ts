import ApiConfig from "./ApiConfig";

export interface ImageInterface {
  deployment: string;
}

class ImageService {
  public getAll(skip: number, take: number) {
    return ApiConfig.get(`image?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiConfig.get(`image/${id}`);
  }

  public create(image: ImageInterface, username?: string, password?: string) {
    return username && password
      ? ApiConfig.post("image", image, { headers: { username, password } })
      : ApiConfig.post("image", image);
  }

  public update(id: number) {
    return ApiConfig.put(`image/${id}`);
  }

  public delete(id: number) {
    return ApiConfig.delete(`image/${id}`);
  }
}

export default new ImageService();
