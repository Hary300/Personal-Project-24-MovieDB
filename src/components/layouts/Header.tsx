export default function Header() {
  return (
    <header>
      {/* Logo */}
      <div>
        <svg
          width='24'
          height='22'
          viewBox='0 0 24 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21 4.32483H14.483L17.1582 1.64967L15.5085 0L11.6667 3.84183L7.82483 0L6.17517 1.64967L8.85033 4.32483H2.33333C1.0465 4.32483 0 5.37133 0 6.65817V19.4915C0 20.7783 1.0465 21.8248 2.33333 21.8248H21C22.2868 21.8248 23.3333 20.7783 23.3333 19.4915V6.65817C23.3333 5.37133 22.2868 4.32483 21 4.32483Z'
            fill='#FDFDFD'
          />
        </svg>
        <span>Movie</span>
      </div>

      {/* Search Icon */}
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.75 18.75L14.75 14.75M16.75 8.75C16.75 10.8717 15.9071 12.9066 14.4069 14.4069C12.9066 15.9071 10.8717 16.75 8.75 16.75C6.62827 16.75 4.59344 15.9071 3.09315 14.4069C1.59285 12.9066 0.75 10.8717 0.75 8.75C0.75 6.62827 1.59285 4.59344 3.09315 3.09315C4.59344 1.59285 6.62827 0.75 8.75 0.75C10.8717 0.75 12.9066 1.59285 14.4069 3.09315C15.9071 4.59344 16.75 6.62827 16.75 8.75Z'
          stroke='#FDFDFD'
          stroke-width='1.5'
          stroke-miterlimit='10'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>

      {/* Hamburger button */}
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
