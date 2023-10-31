import {
  CheckboxVariantEnum,
  CheckboxVariantModel,
  GetCheckboxVariantModelParams,
} from "./types";

export const getCheckboxVariantModel =
  () =>
  <T>({
    data,
    state,
    getSubCheckboxes,
    getCheckboxId,
  }: GetCheckboxVariantModelParams<T>) => {
    const result: CheckboxVariantModel = {};

    data.forEach((item: T) => {
      const subCheckboxes = getSubCheckboxes(item) ?? [];
      const checkboxId = getCheckboxId(item);

      if (subCheckboxes && subCheckboxes.length) {
        const treeTypes = getCheckboxVariantModel()({
          data: subCheckboxes,
          state,
          getCheckboxId,
          getSubCheckboxes,
        });

        Object.assign(result, treeTypes);
        const allChecked = Object.values(treeTypes).every((v) => v.checked);

        if (checkboxId) {
          result[checkboxId] = {
            checked: allChecked,
            type: allChecked
              ? CheckboxVariantEnum.Checked
              : CheckboxVariantEnum.Indeterminate,
          };
        }
      } else {
        if (checkboxId) {
          result[checkboxId] = {
            checked: state[checkboxId],
            type: CheckboxVariantEnum.Checked,
          };
        }
      }
    });

    return result;
  };
