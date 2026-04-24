
export interface CreateProductDto {
  name: string;
  description: string;
  price?: number;
  quantity?: number;
}

export interface ProductDto {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  createTime?: string;
}
