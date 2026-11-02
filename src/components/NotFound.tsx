import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <main id='main' className='page notice-page'>
      <p className='kicker'>Corrections</p>
      <h1 className='notice-title'>This page did not make the edition.</h1>
      <p className='notice-body'>
        The address may have been set wrongly, or the story may have been
        pulled before the presses ran. We regret the error.
      </p>
      <p className='notice-body'>
        <Link to='/'>Return to the front page</Link> or{' '}
        <Link to='/work'>read the contents</Link>.
      </p>
    </main>
  );
}
