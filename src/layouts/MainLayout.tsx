import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import MobileNav from '../components/shared/MobileNav';

type MainLayoutProps = {
  isStatic: boolean;
  hero: boolean;
  children: React.ReactNode;
};

export default function MainLayout({
  isStatic,
  hero,
  children,
}: MainLayoutProps) {
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
    <div className='relative container m-auto overflow-hidden'>
      <Header
        isStatic={isStatic}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <MobileNav show={showMenu} />
      {hero && <Hero />}
      <main className='container px-xl m-auto py-3xl md:px-7xl xl:px-11xl'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
