import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { BillDto, CreateBillDto, GetBillsListDto } from '../../dtos/bill/models';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private restService = inject(RestService);
  apiName = 'Default';
  

  create = (input: CreateBillDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BillDto>({
      method: 'POST',
      url: '/api/app/bill',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/bill/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BillDto>({
      method: 'GET',
      url: `/api/app/bill/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetBillsListDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BillDto>>({
      method: 'GET',
      url: '/api/app/bill',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateBillDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BillDto>({
      method: 'PUT',
      url: `/api/app/bill/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
}