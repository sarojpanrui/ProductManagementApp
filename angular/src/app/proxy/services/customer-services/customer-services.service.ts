import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { CustomerAmountProductDto, CustomerCreateDto, CustomerDto, GetCustomerListDto } from '../../dtos/customer/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerServicesService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CustomerCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'POST',
      url: '/api/app/customer-services',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'DELETE',
      responseType: 'text',
      url: `/api/app/customer-services/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'GET',
      url: `/api/app/customer-services/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCustomerListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CustomerDto>>({
      method: 'GET',
      url: '/api/app/customer-services',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CustomerCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'PUT',
      url: `/api/app/customer-services/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateAmountProductByIdAndInput = (id: string, input: CustomerAmountProductDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'PUT',
      responseType: 'text',
      url: `/api/app/customer-services/${id}/amount-product`,
      body: input,
    },
    { apiName: this.apiName,...config });
}