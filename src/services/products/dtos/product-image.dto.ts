export interface ProductImageDto {
  id: number;
  name: string;
  src: string;
  fileSize: number;
  extension: string;
  createdAt: string;
  products?: {
    id: number;
    name: string;
  }[];
}
