export default async function fetchData(
  data: any,
  method: string,
  id?: string
) {
  const bodyData = {
    data,
    id,
  };

  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" && method !== "HEAD") {
    requestOptions.body = JSON.stringify(bodyData);
  }

  const response = await fetch("/api/invoice", requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
