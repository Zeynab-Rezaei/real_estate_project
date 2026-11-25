export const formatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format;

/** "$2.35 Million" — the editorial price style used on cards. */
export function priceLabel(price) {
  const millions = (price / 1_000_000).toFixed(2).replace(/0$/, '').replace(/\.$/, '');
  return `$${millions} Million`;
}

export const formatNumber = new Intl.NumberFormat('en-US').format;

export function locationLabel(location) {
  return `${location.city}, ${location.region}, ${location.country}`;
}

export function shortLocation(location) {
  return `${location.city}, ${location.region}`;
}
