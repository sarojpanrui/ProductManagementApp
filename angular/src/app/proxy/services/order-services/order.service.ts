import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { CreateOrderDto, GetOrderListDto, OrderDto } from '../../dtos/order/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (ord: CreateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto>({
      method: 'POST',
      url: '/api/app/order',
      body: ord,
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
  

  getList = (input: GetOrderListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OrderDto>>({
      method: 'GET',
      url: '/api/app/order',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  receivedById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: `/api/app/order/${id}/received`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, ord: CreateOrderDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OrderDto>({
      method: 'PUT',
      url: `/api/app/order/${id}`,
      body: ord,
    },
    { apiName: this.apiName,...config });
}