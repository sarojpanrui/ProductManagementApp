import type { EntityDto, PagedResultRequestDto } from '@abp/ng.core';

export interface BillDto extends EntityDto<string> {
  id?: string;
  customer?: string;
  totalAmount?: number;
  buyProducts?: string;
  creationTime?: string;
}

export interface CreateBillDto {
  customer?: string;
  customerId?: string | null;
  totalAmount?: number;
  buyProducts?: string;
}

export interface GetBillsListDto extends PagedResultRequestDto {
}
