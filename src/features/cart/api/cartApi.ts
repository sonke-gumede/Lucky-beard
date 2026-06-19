import { useQuery } from "@tanstack/react-query";

const HEADERS = { Bearer: "Authorization admin_12345438905734895709" };

export function useDelivery(postcode: string, productId: string) {
  const { data, error } = useQuery<{ days: number }>({
    queryKey: ["delivery", postcode, productId],
    queryFn: async () => {
      const res = await fetch(
        `/api/delivery/estimate?postcode=${postcode}&productId=${productId}`,
        { headers: HEADERS },
      );
      const r = await res.json();
      if (!res.ok) throw new Error(r.message || "Failed to check delivery");
      return r;
    },
    enabled: !!postcode,
    retry: false,
  });

  const deliveryMessage = data
    ? `Delivery available in ${data.days} days`
    : error
    ? "Could not check delivery right now"
    : "";

  return { deliveryMessage };
}
