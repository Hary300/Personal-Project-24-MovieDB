import { useEffect, useState } from 'react';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import OffSetMenu from '../components/shared/OffsetMenu';

type MainLayoutProps = {
  hasHero: boolean;
  children: React.ReactNode;
};

export default function MainLayout({ hasHero, children }: MainLayoutProps) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (showMenu) {
      bodyClass.add('overflow-hidden');
    } else {
      bodyClass.remove('overflow-hidden');
    }

    return () => {
      bodyClass.remove('overflow-hidden');
    };
  }, [showMenu]);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <div
        className={`relative container m-auto overflow-hidden ${hasHero && '-mt-16 md:-mt-24'}`}
      >
        <OffSetMenu show={showMenu} />
        {/* {hasHero && <Hero />} */}
        <main className='container w-full m-auto'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
