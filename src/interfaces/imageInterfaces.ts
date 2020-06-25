export interface Image {
  id: string;
  name: string;
}

export interface ImageGetAll {
  data: Image[];
  count: number;
}

export interface ImageGetById {
  data: Image;
}

export interface ImageCreate {
  deployment: string;
}
