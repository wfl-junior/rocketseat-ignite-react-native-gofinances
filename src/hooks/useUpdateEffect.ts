import { useEffect, useRef } from "react";

export const useUpdateEffect: typeof useEffect = (effect, dependencies) => {
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      return effect();
    }

    isFirstRenderRef.current = false;
  }, dependencies);
};
