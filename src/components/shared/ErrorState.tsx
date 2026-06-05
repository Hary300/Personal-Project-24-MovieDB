type ErrorStateProps = {
  error: string;
};

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className='h-100 flex justify-center items-center'>
      <p className='text-lg md:text-2xl'>{error}</p>
    </div>
  );
}
