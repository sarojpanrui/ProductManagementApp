// import type { CreateOrderDto, OrderDto } from './dtos/models';
import { CreateOrderDto } from './dtos/order';
import { OrderDto } from './dtos/order';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (bill: CreateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: '/api/app/order',
      body: bill,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'DELETE',
      responseType: 'text',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto[]>({
      method: 'GET',
      url: '/api/app/order',
    },
    { apiName: this.apiName,...config });
  

  receivedById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: `/api/app/order/${id}/received`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, order: CreateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto>({
      method: 'PUT',
      url: `/api/app/order/${id}`,
      body: order,
    },
    { apiName: this.apiName,...config });
}