
export interface CreateOrderDto {
  vendorName?: string;
  totalAmount?: number;
  buyProducts?: string;
  orderDate?: string;
  deliveryDate?: string;
  isReceived?: boolean;
}

export interface OrderDto {
  id?: string;
  vendorName?: string;
  totalAmount?: number;
  buyProducts?: string;
  orderDate?: string;
  deliveryDate?: string;
  isReceived?: boolean;
}
