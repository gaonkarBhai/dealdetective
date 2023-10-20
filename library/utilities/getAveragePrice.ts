import { PriceHistoryItem } from "@/types";

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0); //sums all prices in the priceList array
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}
