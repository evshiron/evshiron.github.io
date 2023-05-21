import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const REDIRECTS = [
  {
    from: 'evshiron.github.io/are-we-gfx1100-yet',
    to: 'are-we-gfx1100-yet.github.io',
  }
];

export default function _404() {
  const [newHref, setNewHref] = useState('');
  const redirectTimer = useRef();

  useEffect(() => {
    const href = document.location.href;
    for (const redirect of REDIRECTS) {
      if (href.includes(redirect.from)) {
        const newHref = href.replace(redirect.from, redirect.to);
        setNewHref(newHref);
  
        window.location.href = newHref;

        break;
      }
    }
  }, []);

  useEffect(() => {
    if (newHref) {
      clearTimeout(redirectTimer.current);
      setTimeout(() => {
        window.location.href = newHref;
      }, 3000);
    }
  }, [newHref]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {newHref ? (
        <>
          <h1 className='text-xl'>
            Page Moved
          </h1>
          <Link href={newHref}>
              Navigate to new location
          </Link>
        </>
      ) : (
        <>
          <h1 className='text-xl'>
            Page Not Found
          </h1>
          <Link href='/'>
            Return to Home
          </Link>
        </>
      )}
    </div>
  )
}
