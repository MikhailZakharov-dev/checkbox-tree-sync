import { useRef } from "react";
import { CheckboxTreeSyncOptions, TState, CheckboxTreeSync } from "../../index";
import { useControlled } from "./use-controlled";

export const useCheckboxTreeSync = <T>({
  state,
  ...params
}: CheckboxTreeSyncOptions<T>) => {
  const [localState, setLocalState] = useControlled<TState>({
    controlled: state,
    default: {},
  });

  const checkBoxTreeSync = useRef<CheckboxTreeSync<T>>();

  if (!checkBoxTreeSync.current) {
    checkBoxTreeSync.current = new CheckboxTreeSync<T>({
      ...params,
      state: localState,
      onStateChange: (newState) => {
        params.onStateChange?.(newState);
        setLocalState(newState);
      },
    });
  } else {
    checkBoxTreeSync.current.updateParams(params);
    checkBoxTreeSync.current.updateState(localState);
  }

  return {
    checkBoxTreeSync: checkBoxTreeSync.current,
  };
};
