import { Fragment, type ReactNode } from 'react';

/**
 * Prints copy from the content files: `*word*` sets italics, and `[1]` becomes
 * a reference to a margin note when `noteRef` is given.
 */
export function Inline({
  text,
  noteRef
}: {
  text: string;
  noteRef?: (number: number) => ReactNode;
}) {
  const parts = text.split(/(\*[^*]+\*|\[\d+\])/g);
  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part.slice(0, 8)}`;
        if (/^\*[^*]+\*$/.test(part)) {
          return <em key={key}>{part.slice(1, -1)}</em>;
        }
        const note = /^\[(\d+)\]$/.exec(part);
        if (note && noteRef) {
          return <Fragment key={key}>{noteRef(Number(note[1]))}</Fragment>;
        }
        return <Fragment key={key}>{part}</Fragment>;
      })}
    </>
  );
}
