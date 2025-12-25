import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handelTermClick = (term: string) => {
    console.log({ term });
  };

  const handleSearch = async (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;
    if (previousTerms.includes(term)) return;

    setPreviousTerms([term, ...previousTerms].slice(0, 8));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

  return (
    <>
      <CustomHeader
        title="Gifs Search"
        description="Share and discover the perfect gif"
      />

      <SearchBar placeholder="Search what you want" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handelTermClick}
      />

      <GifList gifs={gifs} />
    </>
  );
};
