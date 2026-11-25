import { useFavorites } from '../context/Favorites.jsx';
import { Heart } from './ui/Icons.jsx';
import { useToast } from './ui/Toast.jsx';

export default function FavoriteButton({ slug, name, variant }) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      className={`fav-btn ${variant === 'panel' ? 'fav-btn--panel' : ''} ${active ? 'is-active' : ''}`.trim()}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved properties` : `Save ${name} to your collection`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(slug);
        toast(active ? 'Removed from saved properties' : `Saved ${name}`);
      }}
    >
      <Heart filled={active} />
    </button>
  );
}
