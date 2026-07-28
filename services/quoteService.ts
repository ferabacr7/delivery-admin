type CreateQuotePayload = {
  orderId: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
};

export async function createQuote({
  orderId,
  subtotal,
  deliveryFee,
  total,
  notes,
}: CreateQuotePayload) {
  const response = await fetch("/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      subtotal,
      deliveryFee,
      total,
      notes,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error ?? "No se pudo crear la cotización.");
  }

  return result;
}