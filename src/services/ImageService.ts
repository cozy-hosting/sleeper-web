import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";
import {
  ImageGetAll,
  ImageGetById,
  ImageCreate
} from "@/interfaces/imageInterfaces";

class ContainerService {
  getAll(skip: number, take: number): Promise<AxiosResponse<ImageGetAll>> {
    return apiClient.get(`image?skip=${skip}&take=${take}`);
  }

  getById(id: string): Promise<AxiosResponse<ImageGetById>> {
    return apiClient.get(`image/${id}`);
  }

  pull(image: ImageCreate, username?: string, password?: string) {
    return username && password
      ? apiClient.post("image", image, { headers: { username, password } })
      : apiClient.post("image", image);
  }

  update(id: string) {
    return apiClient.put(`image/${id}`);
  }

  delete(id: string) {
    return apiClient.delete(`image/${id}`);
  }
}

export default new ContainerService();
