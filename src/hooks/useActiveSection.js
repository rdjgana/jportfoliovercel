import { useEffect, useState } from 'react';

export default function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] || '');

  useEffect(() => {
    if (!ids.length) return;
    const observers = [];

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observers.push(observer);

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}
