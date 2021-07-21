import { IProduct } from "./product.model";

export interface IImage {
  id?: number;
  imageDataContentType?: string;
  imageData?: string;
  defaultImage?: boolean | null;
  product?: IProduct | null;
}

export class Image implements IImage {
  constructor(
    public id?: number,
    public imageDataContentType?: string,
    public imageData?: string,
    public defaultImage?: boolean | null,
    public product?: IProduct | null
  ) {
    this.defaultImage = this.defaultImage ?? false;
  }
}

export function getImageIdentifier(image: IImage): number | undefined {
  return image.id;
}
