import { properties } from '../data/properties.js';

export const priceBuckets = [
  { value: '', label: 'Any price' },
  { value: '0-2500000', label: 'Under $2.5M' },
  { value: '2500000-4000000', label: '$2.5M – $4M' },
  { value: '4000000-6000000', label: '$4M – $6M' },
  { value: '6000000-', label: '$6M and above' },
];

export const bedroomOptions = [
  { value: '', label: 'Any beds' },
  { value: '3', label: '3+ beds' },
  { value: '4', label: '4+ beds' },
  { value: '5', label: '5+ beds' },
];

export const bathroomOptions = [
  { value: '', label: 'Any baths' },
  { value: '3', label: '3+ baths' },
  { value: '4', label: '4+ baths' },
  { value: '5', label: '5+ baths' },
];

export const sortOptions = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'size-desc', label: 'Largest first' },
  { value: 'newest', label: 'Newest built' },
];

const matchesPrice = (price, bucket) => {
  if (!bucket) return true;
  const [min, max] = bucket.split('-');
  return price >= Number(min) && (max ? price <= Number(max) : true);
};

export function filterProperties(filters = {}) {
  const { q = '', location = '', type = '', price = '', beds = '', baths = '', sort = 'featured' } = filters;
  const query = q.trim().toLowerCase();

  const results = properties.filter((property) => {
    if (query) {
      const haystack = [
        property.name,
        property.location.city,
        property.location.region,
        property.location.country,
        property.type,
        property.tagline,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (location && property.location.city !== location) return false;
    if (type && property.type !== type) return false;
    if (!matchesPrice(property.price, price)) return false;
    if (beds && property.beds < Number(beds)) return false;
    if (baths && property.baths < Number(baths)) return false;
    return true;
  });

  switch (sort) {
    case 'price-asc':
      return results.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return results.sort((a, b) => b.price - a.price);
    case 'size-desc':
      return results.sort((a, b) => b.sqft - a.sqft);
    case 'newest':
      return results.sort((a, b) => b.yearBuilt - a.yearBuilt);
    default:
      return results.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price);
  }
}
