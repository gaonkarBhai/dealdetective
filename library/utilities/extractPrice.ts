// Extracts and returns the price from a list of possible elements.

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, ""); //matches any character that is not a digit or period

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0]; //matches any string that consists of one or more digits followed by a period followed by two digits
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}
