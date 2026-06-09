import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='hidden lg:flex items-center'>
      <ul className='flex gap-6xl'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {/* <li>
          <Link to='/favorite'>Favorite</Link>
        </li> */}
      </ul>
    </nav>
  );
}
