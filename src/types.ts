export interface CheckboxTreeSyncOptions<T> {
  data: T[];
  state?: TState;
  getSubCheckboxes: (item: T) => T[] | undefined;
  getCheckboxId: (item: T) => string;
  onStateChange?: (state: TState) => void;
  getCheckboxVariantModel?: CheckboxVariantModelCreator<T>;
}

export interface ICheckboxTreeSync {
  getCheckboxesModel(): { checkboxes: CheckboxModel[] };
  pickAll(): void;
}

export type GetCheckboxVariantModelParams<T> = {
  data: T[];
  state: TState;
} & Pick<CheckboxTreeSyncOptions<T>, "getCheckboxId" | "getSubCheckboxes">;

export type CheckboxVariantModelCreator<T> = (
  params: GetCheckboxVariantModelParams<T>
) => CheckboxVariantModel;

/**
 * models
 */
export enum CheckboxVariantEnum {
  Indeterminate = "indeterminate",
  Checked = "checked",
}

export type CheckboxModel = {
  id: string;
  subCheckboxes: CheckboxModel[];
  getVariant: () => CheckboxVariantEnum;
  getToggleHandler: () => () => void;
  getIsChecked: () => boolean;
};

export type FlatTree<T> = Record<
  string,
  {
    data: T;
    id: string;
    parentId?: string;
    children: string[];
  }
>;

export type TState = Record<string, boolean>;

export type CheckboxVariantModel = Record<
  string,
  { type: CheckboxVariantEnum; checked: boolean }
>;
