/**
 * V1 has no real backend: this mocks account creation with a short delay so
 * the UI feels real. Swapping in Supabase auth later only changes this file.
 */
export async function signUp(email: string): Promise<{ userId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { userId: email ? `mock-${email}` : "mock-user" };
}
