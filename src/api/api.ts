export const API_URL = "/api/v1/products/";

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  const data: T = await response.json();
  return data;
}
