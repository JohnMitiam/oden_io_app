import { useEffect, useState } from 'react';

interface Counter {
  target: number;
  duration?: number;
}

export const AnimatedCounter = ({ target, duration = 1500 }: Counter) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = 16;
    const step = Math.ceil(target / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <div className="lg:text-4xl text-3xl font-bold">{count}</div>;
};
