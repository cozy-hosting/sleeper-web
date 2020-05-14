import ApiClient from './ApiClient';
import { AxiosResponse } from 'axios';

export interface Image {
  id: string;
  name: string;
}

export interface GetAllResponse {
  data: Image[];
  count: number;
}

export interface CreateData {
  deployment: string;
}

class ImageService {
  getAll(skip: number, take: number): Promise<AxiosResponse<GetAllResponse>> {
    return ApiClient.get(`image?skip=${skip}&take=${take}`);
  }

  getById(id: string): Promise<AxiosResponse<Image>> {
    return ApiClient.get(`image/${id}`);
  }

  create(image: CreateData, username?: string, password?: string) {
    return username && password
      ? ApiClient.post('image', image, { headers: { username, password } })
      : ApiClient.post('image', image);
  }

  update(id: string) {
    return ApiClient.put(`image/${id}`);
  }

  delete(id: string) {
    return ApiClient.delete(`image/${id}`);
  }
}

export default new ImageService();
