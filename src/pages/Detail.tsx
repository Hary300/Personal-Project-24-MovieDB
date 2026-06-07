import DetailHero from '../components/details/DetailHero';
import MainLayout from '../layouts/MainLayout';

export default function Detail() {
  return (
    <MainLayout isStatic={false} hero={false}>
      <DetailHero />
      Hello
    </MainLayout>
  );
}
