import { useEffect, useState } from 'react';
import ErrorState from '../shared/ErrorState';
import LoadingState from '../shared/LoadingState';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type Option = {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
};

type DetailHeroProps = {
  movieId: number;
};

type MovieDetail = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: string;
  genre: string;
};

type Video = {
  site: string;
  type: string;
};

type Cast = {
  name: string;
  character: string;
};

type CastResponse = {
  cast: Cast[];
};

type AgeResponse = {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      type: number;
    }[];
  }[];
};

export default function DetailHero({ movieId = 315635 }: DetailHeroProps) {
  const MOVIE_DETAIL_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
  const VIDEO_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
  const AGE_LIMIT_URL = `https://api.themoviedb.org/3/movie/${movieId}/release_dates`;
  const CAST_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [video, setVideo] = useState(null);
  const [ageLimit, setAgeLimit] = useState<string | null>(null);
  const [cast, setCast] = useState<Cast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      const option: Option = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        setLoading(true);
        const [movieDetailData, ageData, castData] = await Promise.all([
          fetchJson<MovieDetail>(MOVIE_DETAIL_URL, option),
          fetchJson<AgeResponse>(AGE_LIMIT_URL, option),
          fetchJson<CastResponse>(CAST_URL, option),
        ]);

        setMovieDetail(movieDetailData);
        const usAgeLimit = ageData.results.find(
          (item) => item.iso_3166_1 === 'US'
        );

        const certification =
          usAgeLimit?.release_dates.find(
            (item) => item.type === 3 && item.certification
          )?.certification ?? 'NR';

        setAgeLimit(certification);

        setCast(castData.cast);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown Error');
        }
      } finally {
        setLoading(false);
      }
    }
    async function fetchJson<T>(url: string, option: Option): Promise<T> {
      const res = await fetch(url, option);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    }
    getData();
  }, [MOVIE_DETAIL_URL, AGE_LIMIT_URL, CAST_URL]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!movieDetail || !ageLimit || !cast) return null;
  console.log(movieDetail);
  console.log(ageLimit);
  console.log(cast);

  return <></>;
}
