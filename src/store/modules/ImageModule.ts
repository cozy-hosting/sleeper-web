import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Image, ImageCreate } from "@/interfaces/imageInterfaces";
import ImageService from "@/services/ImageService";

@Module({ namespaced: true, name: "imageModule" })
class ImageModule extends VuexModule {
  images: Image[] = [];

  @Mutation
  SET_IMAGES(images: Image[]) {
    this.images = images;
  }

  @Action
  async fetchImages() {
    const { data } = await ImageService.getAll(0, 20);
    this.SET_IMAGES(data.data);
  }

  @Action
  async createImage(image: ImageCreate, username?: string, password?: string) {
    await ImageService.pull(image, username, password);
    this.fetchImages();
  }

  @Action
  async deleteImage(id: string) {
    await ImageService.delete(id);
    this.fetchImages();
  }

  get getImageById() {
    return async (id: string) => {
      const { data } = await ImageService.getById(id);
      return data.data;
    };
  }
}

export default ImageModule;
