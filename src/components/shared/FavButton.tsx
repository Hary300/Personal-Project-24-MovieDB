type FavButtonProps = {
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FavButton({ like, setLike }: FavButtonProps) {
  const heartIcon = (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z'
        stroke={like ? 'red' : '#FDFDFD'}
        fill={like ? 'red' : 'none'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <button
      className='flex justify-center items-center size-11 border border-neutral-900 backdrop-blur-2xl bg-neutral-950/60 rounded-full cursor-pointer transition-transform duration-200 hover:scale-102'
      onClick={() => setLike((prev) => !prev)}
    >
      {heartIcon}
    </button>
  );
}
