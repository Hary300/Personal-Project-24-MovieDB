import NewRelease from '../components/home/NewRelease';
import TrendingNow from '../components/home/TrendingNow';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout hasHero={true}>
      <TrendingNow />
      <NewRelease />
    </MainLayout>
  );
}
