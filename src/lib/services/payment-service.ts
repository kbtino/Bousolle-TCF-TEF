import type { DurationKey, PaymentMethod, PlanKey } from "@/lib/types/pricing";

/**
 * V1 has no real payment processor — this simulates a successful checkout.
 * Real integration needs both Stripe (card) and a local processor like
 * CinetPay/Flutterwave (mobile money isn't supported by Stripe in most of
 * West Africa); swapping either in only changes this function's body.
 */
export async function createCheckout(
  plan: PlanKey,
  duration: DurationKey,
  method: PaymentMethod,
): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}
