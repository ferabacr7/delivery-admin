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

export type AdminOrder = {
  id: string;
  description: string;
  status: OrderStatus;
  created_at: string;
  profile_id: string;
  address_id: string | null;

  profiles?: {
    full_name: string;
    phone: string | null;
  } | null;

  addresses?: {
    label: string;
    address_line: string;
    reference: string | null;
  } | null;

  quotes?: {
    id: string;
    subtotal: number | null;
    delivery_fee: number | null;
    total: number | null;
    status: QuoteStatus;
  }[] | null;
};