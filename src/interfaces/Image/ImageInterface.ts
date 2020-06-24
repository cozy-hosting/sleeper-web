export interface ImageInterface {
  deployment: string;
}

export interface ImageGetAllResponse {
  data: Image[];
  count: number;
}

export interface ImageGetByIdResponse {
  data: Image;
}

export interface Image {
  id: string;
  name: string;
}
