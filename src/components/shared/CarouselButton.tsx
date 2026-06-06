type CarouselButtonProps = {
  variant: 'prev' | 'next';
  onClick: () => void;
};

export default function CarouselButton({
  variant,
  onClick,
}: CarouselButtonProps) {
  const prevIcon = (
    <svg
      width='9'
      height='14'
      viewBox='0 0 9 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.83333 12.8334L2 7.00002L7.83333 1.16669'
        stroke='#FDFDFD'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  const nextIcon = (
    <svg
      width='9'
      height='14'
      viewBox='0 0 9 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.16667 12.8334L7 7.00002L1.16667 1.16669'
        stroke='#FDFDFD'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${variant === 'prev' ? 'left-1 md:left-10 xl:left-16' : 'right-1 md:right-10 xl:right-16'} size-11 lg:size-14 bg-neutral-950/60 backdrop-blur-2xl rounded-full flex justify-center items-center cursor-pointer z-20 pointer-events-auto`}
    >
      {variant === 'prev' ? prevIcon : nextIcon}
    </button>
  );
}

// Alternatives
// const handlePrev = () => {
//   setCurrentPosition((prev) => Math.max(prev - 3, 0));
// };

// const handleNext = () => {
//   setCurrentPosition((prev) =>
//     Math.min(prev + 3, lastValidPosition)
//   );
// };
