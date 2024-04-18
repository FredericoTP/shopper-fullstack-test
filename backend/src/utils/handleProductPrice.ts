function handleProductPrice(oldPrice: number, newPrice: number): boolean {
  if (oldPrice * 1.1 < newPrice) return false;

  if (oldPrice * 0.9 > newPrice) return false;

  return true;
}

export default handleProductPrice;
