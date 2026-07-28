"use client";

import Link from "next/link";
import { Fragment, useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderWorkflowActions } from "@/components/orders/OrderWorkflowActions";
import { QuoteForm } from "@/components/orders/QuoteForm";
import type { AdminOrder, OrderStatus } from "@/types/order";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type RecentOrdersProps = {
  orders: AdminOrder[];
};

function normalizeStatus(status: string): OrderStatus {
  return status.toUpperCase() as OrderStatus;
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const statusLabels: Record<OrderStatus, string> = {
    VALIDATION: t.statusValidation,
    QUOTED: t.statusQuoted,
    ACCEPTED: t.statusAccepted,
    REJECTED: t.statusRejected,
    IN_PROGRESS: t.statusInProgress,
    ON_ROUTE: t.statusOnRoute,
    DELIVERED: t.statusDelivered,
    CANCELLED: t.statusCancelled,
  };

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-900">
          {t.recentOrdersTitle}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm font-medium text-slate-700">
              {t.recentOrdersEmptyTitle}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {t.recentOrdersEmptyDescription}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t.tableCustomer}</TableHead>
                  <TableHead>{t.tableOrder}</TableHead>
                  <TableHead>{t.tableStatus}</TableHead>
                  <TableHead>{t.tableTotal}</TableHead>
                  <TableHead>{t.tableAction}</TableHead>
                  <TableHead>Detalle</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => {
                  const latestQuote = order.quotes?.[0] ?? null;
                  const normalizedStatus = normalizeStatus(order.status);

                  return (
                    <Fragment key={order.id}>
                      <TableRow>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">
                              {order.profiles?.full_name ??
                                t.customerWithoutName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.profiles?.phone ?? t.customerWithoutPhone}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="max-w-[320px]">
                          <p className="text-sm text-slate-700">
                            {order.description}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {order.addresses?.address_line ??
                              t.orderWithoutAddress}
                          </p>
                        </TableCell>

                        <TableCell>
                          <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                            {statusLabels[normalizedStatus] ?? normalizedStatus}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {latestQuote?.total ? (
                            <span className="font-semibold text-slate-900">
                              ₡{Number(latestQuote.total).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400">
                              {t.orderWithoutQuote}
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          <OrderWorkflowActions
                            orderId={order.id}
                            status={normalizedStatus}
                          />
                        </TableCell>

                        <TableCell>
                          <Link
                            href={`/orders/${order.id}`}
                            className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            Ver detalle
                          </Link>
                        </TableCell>
                      </TableRow>

                      {normalizedStatus === "VALIDATION" && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-slate-50 p-4">
                            <QuoteForm orderId={order.id} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
