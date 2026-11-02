import { useRef, useState } from 'react';
import { type ContactErrors, type ContactField, LIMITS } from '~/lib/contact';
import { sendLetter } from '~/lib/contact.functions';

type State =
  | { status: 'idle' | 'sending' }
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'rate-limited' | 'failed' };

function Field({
  name,
  label,
  error,
  children
}: {
  name: ContactField;
  label: string;
  error?: string;
  children: (props: {
    id: string;
    name: string;
    required: true;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  }) => React.ReactNode;
}) {
  const id = `letter-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className='field'>
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        name,
        required: true,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined
      })}
      {error ? (
        <p id={errorId} className='field-error'>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const errors = state.status === 'invalid' ? state.errors : {};

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setState({ status: 'sending' });
    try {
      const result = await sendLetter({
        data: {
          name: String(data.name ?? ''),
          email: String(data.email ?? ''),
          message: String(data.message ?? ''),
          website: String(data.website ?? '')
        }
      });
      if (result.status === 'sent') {
        setSent(true);
        requestAnimationFrame(() => receiptRef.current?.focus());
      } else if (result.status === 'invalid') {
        setState({ status: 'invalid', errors: result.errors });
        const first = (['name', 'email', 'message'] as const).find(
          (field) => result.errors[field]
        );
        requestAnimationFrame(() =>
          formRef.current
            ?.querySelector<HTMLElement>(`[name="${first}"]`)
            ?.focus()
        );
      } else {
        setState({ status: 'rate-limited' });
      }
    } catch {
      setState({ status: 'failed' });
    }
  }

  if (sent) {
    return (
      <div ref={receiptRef} className='receipt' tabIndex={-1} role='status'>
        <p className='kicker'>Received</p>
        <p className='receipt-title'>Your letter is on the desk.</p>
        <p>You will have a reply within a week, without any of it being cut for length.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className='letter' onSubmit={onSubmit} noValidate>
      <div className='letter-names'>
        <Field name='name' label='Your name' error={errors.name}>
          {(props) => (
            <input
              {...props}
              type='text'
              autoComplete='name'
              maxLength={LIMITS.name}
            />
          )}
        </Field>
        <Field name='email' label='Your email' error={errors.email}>
          {(props) => (
            <input
              {...props}
              type='email'
              autoComplete='email'
              maxLength={LIMITS.email}
            />
          )}
        </Field>
      </div>
      <Field name='message' label='Your letter' error={errors.message}>
        {(props) => <textarea {...props} rows={9} maxLength={LIMITS.message} />}
      </Field>

      {/* The honeypot: out of sight and out of the tab order. Bots fill it. */}
      <div className='honeypot' aria-hidden='true'>
        <label htmlFor='letter-website'>Leave this field empty</label>
        <input
          id='letter-website'
          name='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
        />
      </div>

      <div className='letter-send'>
        <button
          type='submit'
          className='press-button'
          disabled={state.status === 'sending'}
        >
          {state.status === 'sending' ? 'Sending' : 'Send to the editor'}
        </button>
        <p className='letter-status' role='status'>
          {state.status === 'rate-limited'
            ? 'That is a lot of letters for one hour. Please try again later.'
            : state.status === 'failed'
              ? 'The letter did not go through. Your text is still here; please try again.'
              : null}
        </p>
      </div>
    </form>
  );
}
