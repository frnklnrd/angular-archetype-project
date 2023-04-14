/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { FlowActionModel } from '@app/core/flow/api';
import {
  FlowChangeCurrentStatusAction,
  FlowRemoveLastActionFromStackAction,
  FlowRemoveLastFlowStepInLastActionAction,
  FlowResetStackAction,
  FlowStackFlowActionAction,
  FlowStackFlowStepInLastActionAction,
} from '@app/core/flow/store/action';
import { FlowModel, FlowStatusModel } from '@app/core/flow/store/model';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FLOW_STATE_TOKEN } from '../variable/variables';
import { AbstractDataState } from '@app/core/ddd/api';

@State<FlowModel>({
  name: FLOW_STATE_TOKEN,
  defaults: FlowDataState.getStoredDefaultsValue(),
})
@Injectable()
export class FlowDataState extends AbstractDataState {
  static override getStoredDefaultsValue(): FlowModel {
    return {
      status: null,
      stack: [],
    };
  }

  static override getStoredKeys(prefix: string = ''): string[] {
    return ['status', 'stack'].map(
      (key) =>
        (prefix && prefix !== '' ? prefix + '.' : '') + 'flow' + '.' + key
    );
  }

  // ----------------------------------------------------------

  @Selector()
  static getStatus(state: FlowModel): FlowStatusModel | null {
    return state.status;
  }

  @Selector()
  static getCurrentFlowAction(state: FlowModel): FlowActionModel | null {
    return state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
  }

  @Selector()
  static getPreviousFlowAction(state: FlowModel): FlowActionModel | null {
    return state.stack.length > 1 ? state.stack[state.stack.length - 2] : null;
  }

  // ----------------------------------------------------------

  @Action(FlowChangeCurrentStatusAction)
  changeCurrentStatus(
    ctx: StateContext<FlowModel>,
    action: FlowChangeCurrentStatusAction
  ): void {
    const state = ctx.getState();
    const stack = state.stack;
    const date = new Date();
    const flowStatus = Object.assign<any, FlowStatusModel, any>(
      {},
      action.status,
      {
        flowActionProcessedAt: date.getTime(),
        flowActionQueuePosition: stack.length,

        flowActionCanClose: stack.length !== 0,
        flowActionCanGoHome: stack.length !== 0,
        flowActionCanBackward:
          action.status.flowActionCanBackward !== false &&
          stack.length !== 0 &&
          stack[stack.length - 1].steps.length > 1,
      }
    );

    ctx.patchState({
      status: flowStatus,
    });
  }

  // ----------------------------------------------------------

  @Action(FlowResetStackAction)
  resetStack(ctx: StateContext<FlowModel>, action: FlowResetStackAction): void {
    const state = ctx.getState();
    if (action.reset) {
      ctx.patchState({
        stack: [],
      });
    }
  }

  // ----------------------------------------------------------

  @Action(FlowRemoveLastActionFromStackAction)
  removeLastActionFromStack(
    ctx: StateContext<FlowModel>,
    action: FlowRemoveLastActionFromStackAction
  ): FlowActionModel | null {
    const state = ctx.getState();
    const stack = state.stack;
    if (action.remove && stack.length > 0) {
      const val = stack[stack.length - 1];
      ctx.patchState({
        stack: stack.filter((e, i) => i !== stack.length - 1),
      });
      return val ? val : null;
    }
    return null;
  }

  // ----------------------------------------------------------

  @Action(FlowStackFlowActionAction)
  stackFlowAction(
    ctx: StateContext<FlowModel>,
    action: FlowStackFlowActionAction
  ): void {
    const state = ctx.getState();
    if (action.flowAction) {
      const stack = state.stack;
      ctx.patchState({
        stack: [...stack, action.flowAction],
      });
    }
  }

  // ----------------------------------------------------------

  @Action(FlowStackFlowStepInLastActionAction)
  stackFlowStepInLastAction(
    ctx: StateContext<FlowModel>,
    action: FlowStackFlowStepInLastActionAction
  ): void {
    const state = ctx.getState();
    const lastAction =
      state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
    if (action.flowStep && lastAction) {
      const stack = state.stack;

      const newStepsData: any[] = [];

      lastAction.steps.forEach((step, i) => {
        newStepsData.push(Object.assign({}, step));
      });
      newStepsData.push(action.flowStep);

      newStepsData.forEach((step, i) => {
        step.isFirst = i === 0;
        step.isLast = i === newStepsData.length - 1;
        step.isCurrent = i === newStepsData.length - 1;
      });

      ctx.patchState({
        stack: [
          ...stack.filter((e, i) => i !== stack.length - 1),
          Object.assign({}, lastAction, {
            steps: [...newStepsData],
          }),
        ],
      });
    }
  }

  // ----------------------------------------------------------

  @Action(FlowRemoveLastFlowStepInLastActionAction)
  removeLastFlowStepInLastAction(
    ctx: StateContext<FlowModel>,
    action: FlowRemoveLastFlowStepInLastActionAction
  ): void {
    const state = ctx.getState();
    const lastAction =
      state.stack.length > 0 ? state.stack[state.stack.length - 1] : null;
    if (action.remove && lastAction && lastAction.steps.length > 1) {
      const stack = state.stack;

      const newStepsData: any[] = [];

      lastAction.steps.forEach((step, i) => {
        if (i !== lastAction.steps.length - 1) {
          newStepsData.push(Object.assign({}, step));
        }
      });

      newStepsData.forEach((step, i) => {
        step.isCurrent = i === newStepsData.length - 1;
        step.isLast = i === newStepsData.length - 1;
        step.isFirst = i === 0;
      });

      ctx.patchState({
        stack: [
          ...stack.filter((e, i) => i !== stack.length - 1),
          Object.assign({}, lastAction, {
            steps: [...newStepsData],
          }),
        ],
      });
    }
  }

  // ----------------------------------------------------------
}
