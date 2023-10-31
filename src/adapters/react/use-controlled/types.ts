export interface UseControlledProps<T = unknown> {
    /**
     * Holds the component value when it's controlled.
     */
    controlled?: T;
    /**
     * The default value when uncontrolled.
     */
    default: T;
}

export type TUseControlledSetState<T> = T | ((prevState: T) => T);
