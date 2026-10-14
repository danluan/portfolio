import { Fragment } from "react";

/**
 * Renders the tiny inline markup used in lib/cv.ts:
 * **texto** -> <strong>, *texto* -> <em>.
 */
const RichText = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
};

export default RichText;
