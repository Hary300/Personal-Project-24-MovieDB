import Logo from '../shared/Logo';
import Nav from '../shared/Nav';

type HeaderProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ showMenu, setShowMenu }: HeaderProps) {
  const searchIcon = (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.75 18.75L14.75 14.75M16.75 8.75C16.75 10.8717 15.9071 12.9066 14.4069 14.4069C12.9066 15.9071 10.8717 16.75 8.75 16.75C6.62827 16.75 4.59344 15.9071 3.09315 14.4069C1.59285 12.9066 0.75 10.8717 0.75 8.75C0.75 6.62827 1.59285 4.59344 3.09315 3.09315C4.59344 1.59285 6.62827 0.75 8.75 0.75C10.8717 0.75 12.9066 1.59285 14.4069 3.09315C15.9071 4.59344 16.75 6.62827 16.75 8.75Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <>
      <header
        className={`${showMenu ? 'static' : 'absolute'} container m-auto flex items-center justify-between px-xl h-7xl lg:h-9xl md:py-6xl md:px-7xl xl:px-11xl z-5  ${showMenu ? 'bg-black' : ''} `}
      >
        <div className='flex gap-8xl'>
          <Logo />
          <Nav />
        </div>

        <div className='flex gap-3xl items-center'>
          {/* Search Icon */}
          <div className='lg:hidden'>{searchIcon}</div>
          <div className='hidden relative lg:flex border bg-neutral-950/60 border-neutral-800 backdrop-blur-2xl rounded-2xl '>
            <input
              type='text'
              placeholder='Search Movie'
              className='size-full py-md pl-12 focus:outline-0'
            />
            <div className='absolute text-neutral-500 top-1/2 -translate-y-1/2 left-4'>
              {searchIcon}
            </div>
          </div>

          {/* Hamburger button */}
          <button
            className='hamburger-button flex flex-col  px-[2.25px] py-[6.25px] gap-sm cursor-pointer md:hidden'
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <span
              className={`${showMenu && 'rotate-45 translate-y-md'}`}
            ></span>
            <span className={`${showMenu && 'opacity-0'}`}></span>
            <span
              className={`${showMenu && '-rotate-45 -translate-y-md'}`}
            ></span>
          </button>
        </div>
      </header>
    </>
  );
}
