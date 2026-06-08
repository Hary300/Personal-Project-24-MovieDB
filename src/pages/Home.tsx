import Hero from '../components/home/Hero';
import NewRelease from '../components/home/NewRelease';
import TrendingNow from '../components/home/TrendingNow';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout hasHero={true}>
      <Hero />
      <TrendingNow />
      <NewRelease />
    </MainLayout>
  );
}
