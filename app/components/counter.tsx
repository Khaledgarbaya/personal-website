import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="not-prose flex items-center gap-4 text-black">
      <button
        className="rounded bg-cyan-700 px-2 py-1 text-white"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <p>Count: {count}</p>
    </div>
  );
};
