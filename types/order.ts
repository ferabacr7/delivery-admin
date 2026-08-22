export type OrderStatus =
  | "VALIDATION"
  | "QUOTED"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "ON_ROUTE"
  | "DELIVERED"
  | "CANCELLED";

export type QuoteStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED";

export type SupportedOrderCurrency = "CRC" | "USD";

export type PaymentMethod =
  | "CASH"
  | "SINPE"
  | string;

export type AdminQuote = {
  id: string;
  subtotal: number | null;
  delivery_fee: number | null;
  total: number | null;
  status: QuoteStatus;

  service_type: string | null;
  zone: string | null;
  estimated_distance_km: number | null;
  quote_source: string | null;
  calculation_version: number | null;

  service_fee: number | null;
  commission: number | null;
  surcharges: number | null;
  currency: string | null;

  service_fee_crc: number | null;
  delivery_fee_crc: number | null;
  subtotal_crc: number | null;
  total_crc: number | null;
};

export type AdminOrder = {
  id: string;
  description: string;
  status: OrderStatus;
  created_at: string;
  profile_id: string;
  address_id: string | null;

  estimated_purchase_amount: number | null;
  estimated_purchase_currency: SupportedOrderCurrency | null;
  payment_method: PaymentMethod | null;
  cash_payment_amount: number | null;
  cash_payment_currency: SupportedOrderCurrency | null;

  profiles?: {
    full_name: string;
    phone: string | null;
  } | null;

  addresses?: {
    label: string;
    address_line: string;
    reference: string | null;
  } | null;

  quotes?: AdminQuote[] | null;
};

export type AdminOrderDetail = AdminOrder & {
  admin_notes: string | null;

  deliveries: {
    id: string;
    status: string;
    driver_id: string | null;
    started_at: string | null;
    delivered_at: string | null;
    created_at?: string;
    updated_at: string;

    driver?: {
      full_name: string;
      phone: string | null;
    } | null;
  } | null;
};