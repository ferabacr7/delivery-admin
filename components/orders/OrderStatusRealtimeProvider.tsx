"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

export type OrderStatus =
  | "VALIDATION"
  | "QUOTED"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "ON_ROUTE"
  | "DELIVERED"
  | "CANCELLED";

export type DeliveryStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ON_ROUTE"
  | "DELIVERED"
  | "CANCELLED";

export type OperationalStatus =
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "ON_ROUTE"
  | "DELIVERED";

type OrderStatusRealtimeContextValue = {
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus | null;
  effectiveStatus: OrderStatus;
  operationalStatus: OperationalStatus | null;
};

type OrderStatusRealtimeProviderProps = {
  orderId: string;
  initialOrderStatus: OrderStatus;
  initialDeliveryStatus: DeliveryStatus | null;
  children: ReactNode;
};

const OrderStatusRealtimeContext =
  createContext<OrderStatusRealtimeContextValue | null>(null);

function getEffectiveStatus(
  orderStatus: OrderStatus,
  deliveryStatus: DeliveryStatus | null,
): OrderStatus {
  if (deliveryStatus === "DELIVERED") {
    return "DELIVERED";
  }

  if (deliveryStatus === "ON_ROUTE") {
    return "ON_ROUTE";
  }

  if (deliveryStatus === "IN_PROGRESS") {
    return "IN_PROGRESS";
  }

  if (deliveryStatus === "CANCELLED") {
    return "CANCELLED";
  }

  return orderStatus;
}

function getOperationalStatus(
  effectiveStatus: OrderStatus,
): OperationalStatus | null {
  if (
    effectiveStatus === "ACCEPTED" ||
    effectiveStatus === "IN_PROGRESS" ||
    effectiveStatus === "ON_ROUTE" ||
    effectiveStatus === "DELIVERED"
  ) {
    return effectiveStatus;
  }

  return null;
}

export function OrderStatusRealtimeProvider({
  orderId,
  initialOrderStatus,
  initialDeliveryStatus,
  children,
}: OrderStatusRealtimeProviderProps) {
  const [orderStatus, setOrderStatus] =
    useState<OrderStatus>(initialOrderStatus);

  const [deliveryStatus, setDeliveryStatus] =
    useState<DeliveryStatus | null>(initialDeliveryStatus);

  const effectiveStatus = getEffectiveStatus(
    orderStatus,
    deliveryStatus,
  );

  const operationalStatus =
    getOperationalStatus(effectiveStatus);

  useEffect(() => {
    const channels: RealtimeChannel[] = [];

    const orderChannel = supabase
      .channel(`admin-order-status-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          const nextStatus =
            payload.new.status as OrderStatus | undefined;

          if (nextStatus) {
            setOrderStatus(nextStatus);
          }
        },
      )
      .subscribe();

    channels.push(orderChannel);

    const deliveryChannel = supabase
      .channel(`admin-delivery-status-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "deliveries",
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          const nextStatus =
            payload.new.status as DeliveryStatus | undefined;

          if (nextStatus) {
            setDeliveryStatus(nextStatus);
          }
        },
      )
      .subscribe();

    channels.push(deliveryChannel);

    return () => {
      channels.forEach((channel) => {
        supabase.removeChannel(channel);
      });
    };
  }, [orderId]);

  return (
    <OrderStatusRealtimeContext.Provider
      value={{
        orderStatus,
        deliveryStatus,
        effectiveStatus,
        operationalStatus,
      }}
    >
      {children}
    </OrderStatusRealtimeContext.Provider>
  );
}

export function useOrderStatusRealtime() {
  const context = useContext(OrderStatusRealtimeContext);

  if (!context) {
    throw new Error(
      "useOrderStatusRealtime must be used inside OrderStatusRealtimeProvider",
    );
  }

  return context;
}