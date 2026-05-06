import type { PagedResultRequestDto } from '@abp/ng.core';

export interface CreateProductDto {
  name: string;
  description: string;
  price?: number;
  quantity?: number;
}

export interface GetProductListDto extends PagedResultRequestDto {
}

export interface ProductDto {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  createTime?: string;
}
