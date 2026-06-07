type ButtonProps = {
  title?: string;
  loading?: boolean;
  onClick?: () => void;
};

export default function Button({
  title = 'Watch Trailer',
  loading = false,
  onClick,
}: ButtonProps) {
  const watchTrailerIcon = (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id='mask0_31745_872'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='18'
        height='18'
      >
        <path
          d='M9 16.5C13.1423 16.5 16.5 13.1423 16.5 9C16.5 4.85775 13.1423 1.5 9 1.5C4.85775 1.5 1.5 4.85775 1.5 9C1.5 13.1423 4.85775 16.5 9 16.5Z'
          fill='white'
          stroke='white'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
        <path
          d='M7.5 9.0001V6.4021L9.75 7.7011L12 9.0001L9.75 10.2991L7.5 11.5981V9.0001Z'
          fill='black'
          stroke='black'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
      </mask>
      <g mask='url(#mask0_31745_872)'>
        <path d='M0 0H18V18H0V0Z' fill='#FDFDFD' />
      </g>
    </svg>
  );
  return (
    <button
      className={`flex items-center justify-center gap-md p-md rounded-full transition-transform duration-200 hover:scale-101 active:scale-100 ${title === 'Watch Trailer' ? 'bg-primary-300' : 'bg-neutral-950/60 border border-neutral-900 backdrop-blur-2xl'} w-full text-sm font-semibold text-neutral-25 cursor-pointer z-30 `}
      onClick={onClick}
    >
      {title === 'Watch Trailer' ? (
        <>
          {title} {watchTrailerIcon}
        </>
      ) : loading ? (
        'Loading...'
      ) : (
        title
      )}
    </button>
  );
}
