type DeliveryStatus = "IN_PROGRESS" | "ON_ROUTE" | "DELIVERED";

export async function updateDeliveryWorkflow(
  orderId: string,
  nextStatus: DeliveryStatus
) {
  const response = await fetch("/api/workflow", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      nextStatus,
    }),
  });

  const text = await response.text();

  let result: { error?: string; success?: boolean } | null = null;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = null;
  }

  if (!response.ok) {
    console.error("Workflow API failed:", {
      status: response.status,
      statusText: response.statusText,
      body: text,
      result,
    });

    throw new Error(
      result?.error ??
        `HTTP ${response.status} - ${response.statusText}. Revisa la terminal.`
    );
  }

  return result;
}