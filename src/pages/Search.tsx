import MovieList from '../components/movie-list/MovieList';
import MainLayout from '../layouts/MainLayout';

export default function Search() {
  return (
    <MainLayout hasHero={false}>
      <MovieList />
    </MainLayout>
  );
}
