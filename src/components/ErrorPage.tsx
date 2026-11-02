import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';

export function ErrorPage({ error }: ErrorComponentProps) {
  const router = useRouter();
  console.error(error);
  return (
    <main id='main' className='page notice-page'>
      <p className='kicker'>Stop press</p>
      <h1 className='notice-title'>Something went wrong on the night shift.</h1>
      <p className='notice-body'>
        This page could not be set. Trying again usually works.
      </p>
      <p className='notice-body'>
        <button
          type='button'
          className='press-button'
          onClick={() => router.invalidate()}
        >
          Try again
        </button>
      </p>
    </main>
  );
}
