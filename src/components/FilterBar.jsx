import { bathroomOptions, bedroomOptions, priceBuckets, sortOptions } from '../lib/filters.js';
import { propertyCities, propertyTypes } from '../data/properties.js';
import { Search } from './ui/Icons.jsx';

export default function FilterBar({ filters, onChange }) {
  return (
    <form
      className="filters"
      role="search"
      aria-label="Filter properties"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="field filters__search">
        <label className="field__label" htmlFor="filter-q">
          Search
        </label>
        <Search />
        <input
          id="filter-q"
          className="input"
          type="search"
          placeholder="Name, city or keyword"
          value={filters.q}
          onChange={(event) => onChange('q', event.target.value)}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-location">
          Location
        </label>
        <select
          id="filter-location"
          className="select"
          value={filters.location}
          onChange={(event) => onChange('location', event.target.value)}
        >
          <option value="">All locations</option>
          {propertyCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-type">
          Property type
        </label>
        <select
          id="filter-type"
          className="select"
          value={filters.type}
          onChange={(event) => onChange('type', event.target.value)}
        >
          <option value="">All types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-price">
          Price
        </label>
        <select
          id="filter-price"
          className="select"
          value={filters.price}
          onChange={(event) => onChange('price', event.target.value)}
        >
          {priceBuckets.map((bucket) => (
            <option key={bucket.value} value={bucket.value}>
              {bucket.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-beds">
          Bedrooms
        </label>
        <select
          id="filter-beds"
          className="select"
          value={filters.beds}
          onChange={(event) => onChange('beds', event.target.value)}
        >
          {bedroomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="filter-baths">
          Bathrooms
        </label>
        <select
          id="filter-baths"
          className="select"
          value={filters.baths}
          onChange={(event) => onChange('baths', event.target.value)}
        >
          {bathroomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field field--sort">
        <label className="field__label" htmlFor="filter-sort">
          Sort by
        </label>
        <select
          id="filter-sort"
          className="select"
          value={filters.sort}
          onChange={(event) => onChange('sort', event.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
