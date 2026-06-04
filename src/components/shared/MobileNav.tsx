type MobileNav = {
  show: boolean;
};

export default function MobileNav({ show }: MobileNav) {
  return (
    <nav
      className={`fixed w-full top-7xl z-10 bg-black h-screen ${show ? 'opacity-100' : 'opacity-0 invisible'}`}
    >
      <ul className='flex flex-col gap-xl px-4'>
        <li>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='#'>Favorite</a>
        </li>
      </ul>
    </nav>
  );
}
