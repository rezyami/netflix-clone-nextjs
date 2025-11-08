import { useRef, useEffect } from "react";

function AutoScrollParagraph({ children }) {
  const ref = useRef();

  useEffect(() => {
    let direction = 1;
    let interval = setInterval(() => {
      if (ref.current) {
        // At bottom, reverse
        if (
          ref.current.scrollTop + ref.current.clientHeight >=
          ref.current.scrollHeight
        ) {
          direction = -1;
        }
        // At top, reverse
        if (ref.current.scrollTop <= 0) {
          direction = 1;
        }
        ref.current.scrollTop += direction;
      }
    }, 100); // adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      ref={ref}
      className="text-xs md:text-lg lg:text-2xl z-[99] mt-1 overflow-y-auto scrollbar-thin px-2"
      style={{
        maxHeight: "5em",
        lineHeight: 1.25,
      }}
    >
      {children}
    </p>
  );
}

export default AutoScrollParagraph