export default function Nav() {
  return (
    <nav className='hidden lg:flex items-center'>
      <ul className='flex gap-6xl'>
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
