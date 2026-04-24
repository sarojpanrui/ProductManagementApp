import type { EntityDto } from '@abp/ng.core';

export interface BillDto extends EntityDto<string> {
  id?: string;
  customer?: string;
  totalAmount?: number;
  buyProducts?: string;
  createTime?: string;
}

export interface CreateBillDto {
  customer?: string;
  totalAmount?: number;
  buyProducts?: string;
}
