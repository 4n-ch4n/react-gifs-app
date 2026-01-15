import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { useGifs } from './gifs/hooks/useGifs';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
  const { gifs, previousTerms, handleTermClick, handleSearch } = useGifs();

  return (
    <>
      <CustomHeader
        title="Gifs Search"
        description="Share and discover the perfect gif"
      />

      <SearchBar placeholder="Search what you want" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClick}
      />

      <GifList gifs={gifs} />
    </>
  );
};
