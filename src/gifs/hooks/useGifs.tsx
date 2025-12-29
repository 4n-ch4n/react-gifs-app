import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handelTermClick = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;
    if (previousTerms.includes(term)) return;

    setPreviousTerms([term, ...previousTerms].slice(0, 8));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[term] = gifs;
    console.log(gifsCache);
  };

  return {
    gifs,
    previousTerms,
    handelTermClick,
    handleSearch,
  };
};
