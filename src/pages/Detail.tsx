import MovieDetail from '../components/details/MovieDetail';
import MainLayout from '../layouts/MainLayout';

export default function Detail() {
  return (
    <MainLayout hasHero={false}>
      <MovieDetail />
    </MainLayout>
  );
}
