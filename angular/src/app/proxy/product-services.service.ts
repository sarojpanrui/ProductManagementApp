// import type { CreateProductDto, ProductDto } from './dtos/models';
import { CreateProductDto } from './dtos/product';
import { ProductDto } from './dtos/product';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  createProduct = (input: CreateProductDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'POST',
      url: '/api/app/product-services/product',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteProduct = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product-services/${id}/product`,
    },
    { apiName: this.apiName,...config });
  

  getProductById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'GET',
      url: `/api/app/product-services/${id}/product-by-id`,
    },
    { apiName: this.apiName,...config });
  

  getProducts = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto[]>({
      method: 'GET',
      url: '/api/app/product-services/products',
    },
    { apiName: this.apiName,...config });
  

  updateProduct = (id: string, input: CreateProductDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'PUT',
      url: `/api/app/product-services/${id}/product`,
      body: input,
    },
    { apiName: this.apiName,...config });
}