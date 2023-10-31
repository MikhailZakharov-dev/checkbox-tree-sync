import { CheckboxTreeSync, getCheckboxVariantModel, CheckboxModel } from "../../src/index";
import { data } from "../data";

const Checkbox = (checkbox: CheckboxModel) => {
  const isChecked = checkbox.getIsChecked();
  const isIndeterminate = checkbox.getVariant() === "indeterminate";
  return `
    <label class="p-checkbox">
      <input 
        class="p-checkbox__input"
        type="checkbox" 
        value="${isChecked}"  
        ${isChecked ? "checked" : ""} 
        id="checkbox-${checkbox.id}"
        ${isIndeterminate && isChecked ? 'aria-checked="mixed"' : ""}
      />
      <span class="p-checkbox__label">${checkbox.id}</span>
    </label>
  `;
};

const Item = (checkbox: CheckboxModel): string => {
  const { subCheckboxes } = checkbox;
  const listMarkup = subCheckboxes.length
    ? `<ul>
        ${subCheckboxes
          .map((subCheckbox) => `<li>${Item(subCheckbox)}</li>`)
          .join("")}
       </ul>`
    : "";

  return `
    <div class="item">
      ${[Checkbox(checkbox), listMarkup].join("")}
    </div>
  `;
};

const List = (checkboxes: CheckboxModel[]) => {
  return `
    <h1 class="p-heading--3 u-no-padding--top">Vanilla Example</h1>
    <div class="list p-card">
      <div class="p-card__content">
      ${checkboxes.map(Item).join("")}
      </div>
    </div>
  `;
};

const createApp = (element: HTMLDivElement) => {
  let state = {};

  const checkBoxTreeSync = new CheckboxTreeSync({
    data,
    state,
    getCheckboxId: (item) => item.id,
    getSubCheckboxes: (item) => item.children,
    onStateChange: (newState) => {
      checkBoxTreeSync.updateState(newState);
      render();
    },
    getCheckboxVariantModel: getCheckboxVariantModel(),
  });

  const checkboxes = checkBoxTreeSync.getCheckboxesModel().checkboxes;

  const render = () => {
    element.innerHTML = List(checkboxes);
    attachEventListeners(checkboxes);
  };

  render();
};

export default createApp;

const attachEventListeners = (checkboxes: CheckboxModel[]) => {
  checkboxes.forEach((checkbox) => {
    const checkbox = document.querySelector(`#checkbox-${checkbox.id}`);
    if (checkbox) {
      checkbox.addEventListener("click", () => checkbox.getToggleHandler()());
    }
    if (checkbox.subCheckboxes) {
      attachEventListeners(checkbox.subCheckboxes);
    }
  });
};
