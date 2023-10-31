import { useCallback, useRef, useState } from "react";
import { TUseControlledSetState, UseControlledProps } from "./types";

export const useControlled = <T>({
  controlled,
  default: defaultProp,
}: UseControlledProps<T>) => {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: TUseControlledSetState<T>) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled]
  );

  return [value, setValueIfUncontrolled] as const;
};
