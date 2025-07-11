import { useEffect, useState } from 'react';

const WATCHLIST_KEY = 'cryptoWatchlist';

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  const addToWatchlist = (coin) => {
    const updated = [...watchlist, coin];
    setWatchlist(updated);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  };

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((c) => c.id !== id);
    setWatchlist(updated);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  };

  const isInWatchlist = (id) => {
    return watchlist.some((coin) => coin.id === id);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};

export default useWatchlist;
