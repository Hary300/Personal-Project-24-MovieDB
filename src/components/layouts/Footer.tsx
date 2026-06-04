import Logo from '../shared/Logo';

export default function Footer() {
  return (
    <footer className='container md:items-center m-auto flex flex-col md:flex-row md:justify-between h-30 px-xl md:px-7xl xl:px-11xl gap-md border-t border-neutral-800'>
      <Logo />

      <p className='text-neutral-600 text-xs'>
        &copy; 2026 Created by{' '}
        <a
          href='https://github.com/Hary300'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-primary-200'
        >
          Hary300
        </a>{' '}
        Movie Explorer
      </p>
    </footer>
  );
}
