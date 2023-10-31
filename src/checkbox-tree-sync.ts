import {
  CheckboxModel,
  CheckboxTreeSyncOptions,
  FlatTree,
  ICheckboxTreeSync,
  TState,
  CheckboxVariantModel,
  CheckboxVariantEnum,
} from "./types.js";

export class CheckboxTreeSync<T> implements ICheckboxTreeSync {
  private flattenData: FlatTree<T>;
  private variant: CheckboxVariantModel = {};
  private state: TState = {};

  constructor(private params: CheckboxTreeSyncOptions<T>) {
    this.flattenData = this.makeDataFlat(params.data);

    this.state = params.state ?? {};
  }

  getCheckboxesModel() {
    return {
      checkboxes: this.createSubCheckboxesModel(this.params.data),
    };
  }

  pickAll() {
    const result: TState = {};

    Object.keys(this.flattenData).forEach((id) => {
      result[id] = true;
    });

    this.handleChangeState(result);
  }

  /**
   * make data flat so we can easily find parent and children and retrieve data
   */
  private makeDataFlat(data: T[], parentId?: string) {
    const { getCheckboxId, getSubCheckboxes } = this.params;
    const result: FlatTree<T> = {};

    data.forEach((item) => {
      const subCheckboxes = getSubCheckboxes(item) ?? [];
      const id = getCheckboxId(item);
      const subCheckboxesIds = subCheckboxes.map(getCheckboxId);

      result[id] = {
        id,
        data: item,
        children: subCheckboxesIds,
        parentId,
      };

      if (subCheckboxes.length > 0) {
        const subResult = this.makeDataFlat(subCheckboxes, id);
        Object.assign(result, subResult);
      }
    });

    return result;
  }

  private pickCheckboxParents(checkboxId: string) {
    const result: TState = {};

    let id = checkboxId;

    while (id && this.flattenData[id]?.parentId) {
      id = this.flattenData[id].parentId as string;
      result[id] = true;
    }
    return result;
  }

  private getCheckboxChildren(checkboxId: string): string[] {
    let children = this.flattenData[checkboxId]?.children ?? [];

    const subChildren = children.flatMap((item) =>
      this.getCheckboxChildren(item)
    );

    return children.concat(subChildren);
  }

  private pickCheckboxChildren(checkboxId: string) {
    const result: TState = {};

    const children = this.getCheckboxChildren(checkboxId);

    children.forEach((id) => {
      result[id] = true;
    });

    return result;
  }

  private removeCheckboxParents(checkboxId: string, state: TState) {
    const result: TState = { ...state };
    let parentId = this.flattenData[checkboxId].parentId;

    while (parentId) {
      const parent = this.flattenData[parentId];
      const hasCheckedChild = parent.children.some((child) => result[child]);

      if (hasCheckedChild) {
        parentId = undefined;
      } else {
        delete result[parentId];
        parentId = parent.parentId;
      }
    }

    return result;
  }

  private removeCheckboxChildren(checkboxId: string, state: TState) {
    const result: TState = { ...state };
    const children = this.getCheckboxChildren(checkboxId);

    children.forEach((id) => {
      delete result[id];
    });

    return result;
  }

  private toggleCheckbox(checkboxId: string, value: boolean) {
    const result = { ...this.state };

    if (value) {
      Object.assign(
        result,
        this.pickCheckboxParents(checkboxId),
        this.pickCheckboxChildren(checkboxId),
        {
          [checkboxId]: true,
        }
      );

      return result;
    }

    delete result[checkboxId];
    const removedParents = this.removeCheckboxParents(checkboxId, result);
    const removedChildren = this.removeCheckboxChildren(checkboxId, removedParents);

    return removedChildren;
  }

  /**
   * checkbox model for rendering
   */
  private createCheckboxModel(dataItem: T): Omit<CheckboxModel, "subCheckboxes"> {
    const id = this.params.getCheckboxId(dataItem);

    return {
      id,
      getIsChecked: () => !!this?.state?.[id],
      getVariant: () => {
        return this.variant[id]?.type ?? CheckboxVariantEnum.Checked;
      },
      getToggleHandler: () => {
        return () => {
          const state = this.state?.[id];
          const newState = this.toggleCheckbox(id, !state);

          this.handleChangeState(newState);
        };
      },
    };
  }

  /**
   * checkbox model for rendering
   */
  private createSubCheckboxesModel(data: T[]): CheckboxModel[] {
    return data.map((item) => {
      const checkboxModel = this.createCheckboxModel(item);
      const subCheckboxes = this.params.getSubCheckboxes(item) ?? [];
      const subBrachesModel = this.createSubCheckboxesModel(subCheckboxes);

      return {
        ...checkboxModel,
        subCheckboxes: subBrachesModel,
      };
    });
  }

  private handleChangeState(state: TState) {
    if (this.params?.onStateChange) {
      this.params.onStateChange?.(state);
    } else {
      this.updateState(state);
    }
  }

  private updateVariant(state: TState) {
    this.variant =
      this.params?.getCheckboxVariantModel?.({
        data: this.params.data,
        state,
        getCheckboxId: this.params.getCheckboxId,
        getSubCheckboxes: this.params.getSubCheckboxes,
      }) ?? {};
  }

  updateParams(params: Omit<CheckboxTreeSyncOptions<T>, "state">) {
    const isDataChanged = params.data && this.params?.data !== params.data;

    if (isDataChanged) {
      this.flattenData = this.makeDataFlat(params.data);
    }

    this.params = params;
  }

  updateState(state?: TState) {
    const isStateChanged = state !== undefined && this.params.state !== state;

    if (isStateChanged) {
      this.updateVariant(state!);
      this.state = state!;
    }
  }
}
