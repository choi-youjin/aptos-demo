import { useCallback, useEffect, useState } from 'react';

const useProcessing = <T extends any>() => {
  const [target, setTarget] = useState<T | undefined>(undefined);

  useEffect(() => {
    setTarget(undefined);
  }, []);

  const startProcessing = useCallback((target: T) => setTarget(target), []);
  const stopProcessing = useCallback(() => setTarget(undefined), []);
  const isProcessing = target !== undefined;

  return {
    startProcessing,
    stopProcessing,
    isProcessing,
  };
};

export default useProcessing;
