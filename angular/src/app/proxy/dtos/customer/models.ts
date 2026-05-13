import type { PagedResultRequestDto } from '@abp/ng.core';

export interface CustomerAmountProductDto {
  totalAmount?: number | null;
  products?: string | null;
}

export interface CustomerCreateDto {
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface CustomerDto {
  id?: string | null;
  name?: string | null;
  address?: string | null;
  totalAmount?: number | null;
  phone?: string | null;
  email?: string | null;
  products?: string | null;
  creationTime?: string;
}

export interface GetCustomerListDto extends PagedResultRequestDto {
}
