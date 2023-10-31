import React, { useState } from "react";
import { data } from "../data";
import { CheckboxModel, getCheckboxVariantModel, useCheckboxTreeSync } from "../../src";

type CheckboxProps = {
  isChecked: boolean;
  variant: "checkbox" | "indeterminate";
  id: string;
  onChange?: (value: boolean) => void;
};

const Checkbox = ({ isChecked, variant, id, onChange }: CheckboxProps) => {
  return (
    <label className="p-checkbox">
      <input
        className="p-checkbox__input"
        type="checkbox"
        {...{
          onChange: (e) => onChange?.(e.target.checked),
          value: isChecked.toString(),
          checked: isChecked,
          id: `checkbox-${id}`,
          ...(variant === "indeterminate" &&
            isChecked && {
              "aria-checked": "mixed",
            }),
        }}
      />
      <span className="p-checkbox__label">{id}</span>
    </label>
  );
};

type ItemProps = {
  checkbox: CheckboxModel;
};

const Item = ({ checkbox }: ItemProps) => {
  const { subCheckboxes } = checkbox;
  const list = subCheckboxes.length ? (
    <ul>
      {subCheckboxes.map((subCheckbox) => (
        <li key={subCheckbox.id}>
          <Item checkbox={subCheckbox} />
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div className="item">
      <Checkbox
        {...{
          isChecked: checkbox.getIsChecked(),
          variant:
            checkbox.getVariant() === "indeterminate"
              ? "indeterminate"
              : "checkbox",
          id: checkbox.id,
          onChange: checkbox.getToggleHandler(),
        }}
      />
      {list}
    </div>
  );
};

const List = () => {
  const [state, setState] = useState({});

  const { checkBoxTreeSync } = useCheckboxTreeSync({
    data,
    getCheckboxId: (item) => item.id,
    getSubCheckboxes: (item) => item.children ?? [],
    getCheckboxVariantModel: getCheckboxVariantModel(),
    state,
    onStateChange: setState,
  });

  return (
    <>
      <h1 className="p-heading--3 u-no-padding--top">React Example</h1>
      <div className="list p-card">
        <div className="p-card__content">
          {checkBoxTreeSync.getCheckboxesModel().checkboxes.map((checkbox) => (
            <Item checkbox={checkbox} key={checkbox.id} />
          ))}
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div>
      <List />
    </div>
  );
};

export default App;
