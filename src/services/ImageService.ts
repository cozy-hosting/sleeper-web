import ApiConfig from "./ApiConfig";

interface ImageInterface {
  deployment: string;
}

class ImageService {
  getAll(skip: number, take: number) {
    return ApiConfig.get(`image?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiConfig.get(`image/${id}`);
  }

  create(image: ImageInterface, username?: string, password?: string) {
    return username && password
      ? ApiConfig.post("image", image, { headers: { username, password } })
      : ApiConfig.post("image", image);
  }

  update(id: number) {
    return ApiConfig.put(`image/${id}`);
  }

  delete(id: number) {
    return ApiConfig.delete(`image/${id}`);
  }
}

export default new ImageService();
