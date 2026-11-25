import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { Close } from '../components/ui/Icons.jsx';
import {
  bathroomOptions,
  bedroomOptions,
  filterProperties,
  priceBuckets,
} from '../lib/filters.js';

const labelFor = (options, value) => options.find((option) => option.value === value)?.label || value;

export default function Properties() {
  const [params, setParams] = useSearchParams();
  const filterKey = params.toString();

  const filters = useMemo(
    () => ({
      q: params.get('q') ?? '',
      location: params.get('location') ?? '',
      type: params.get('type') ?? '',
      price: params.get('price') ?? '',
      beds: params.get('beds') ?? '',
      baths: params.get('baths') ?? '',
      sort: params.get('sort') ?? 'featured',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterKey]
  );

  const results = useMemo(() => filterProperties(filters), [filterKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && !(key === 'sort' && value === 'featured')) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  const activeChips = [
    filters.q && { key: 'q', label: `“${filters.q}”` },
    filters.location && { key: 'location', label: filters.location },
    filters.type && { key: 'type', label: filters.type },
    filters.price && { key: 'price', label: labelFor(priceBuckets, filters.price) },
    filters.beds && { key: 'beds', label: labelFor(bedroomOptions, filters.beds) },
    filters.baths && { key: 'baths', label: labelFor(bathroomOptions, filters.baths) },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Find your next address."
        image="1600596542815-ffad4c1539a9"
      >
        <p>
          Browse our collection of exceptional residences and investment properties. Refine by
          location, type or price — or simply tell us what you have in mind.
        </p>
      </PageHero>

      <section className="section listing">
        <div className="container">
          <div className="listing__filters">
            <FilterBar filters={filters} onChange={update} />
          </div>

          <div className="listing__bar">
            <p className="listing__count" aria-live="polite">
              <strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'}
              {filters.location ? ` in ${filters.location}` : ''}
            </p>
            {activeChips.length ? (
              <div className="chips">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className="chip"
                    onClick={() => update(chip.key, '')}
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    {chip.label}
                    <Close />
                  </button>
                ))}
                <button type="button" className="chip chip--reset" onClick={reset}>
                  Clear all
                </button>
              </div>
            ) : null}
          </div>

          {results.length ? (
            <div className="listing__grid">
              {results.map((property, index) => (
                <Reveal key={property.slug} delay={Math.min(index * 45, 180)}>
                  <PropertyCard property={property} variant="panel" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="listing__empty">
              <h3>No properties match those filters</h3>
              <p>
                Try widening the price range or clearing a filter — or speak with an advisor about
                off-market opportunities.
              </p>
              <button type="button" className="btn btn--navy" onClick={reset}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
