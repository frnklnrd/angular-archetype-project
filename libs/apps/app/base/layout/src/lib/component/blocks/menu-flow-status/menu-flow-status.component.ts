import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '@app/core/api';
import { AuthDataState } from '@app/core/auth/store/state';
import { FlowManagerService } from '@app/core/flow/manager/default';
import { FlowStatusModel } from '@app/core/flow/store/model';
import { FlowDataState } from '@app/core/flow/store/state';
import {
  ModalAlertResultModel,
  ModalManagerService,
} from '@app/core/ui/modal/default';
import { Autowired } from '@app/core/util/code/decorator/autowired';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-flow-status',
  templateUrl: './menu-flow-status.component.html',
  styleUrls: ['./menu-flow-status.component.scss'],
})
export class MenuFlowStatusComponent
  extends AbstractComponent
  implements OnInit
{
  // -----------------------------------------------------
  // SERVICES
  // -----------------------------------------------------

  @Autowired(FlowManagerService)
  public flow!: FlowManagerService;

  @Autowired(ModalManagerService)
  public modal!: ModalManagerService;

  // -----------------------------------------------------
  // OBSERVABLES
  // -----------------------------------------------------

  @Select(AuthDataState.isLogged)
  public isUserLogged$!: Observable<boolean>;

  @Select(FlowDataState.getStatus)
  public currentFlowStatus$!: Observable<FlowStatusModel>;

  // -----------------------------------------------------

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onClickLogin(): void {
    this.flow.startAction('', '', 'login', null, {}, true).then();
  }

  onClickLogout(): void {
    this.flow.startAction('', '', 'logout', null, {}, true).then();
  }

  onClickHome(): void {
    this.flow.startAction('', '', '', null, {}, true).then();
  }

  onClickBackwardAction(): void {
    this.flow.stepBackward().then();
  }

  onClickCloseAction(): void {
    this.modal.openConfirm(
      'Closing Confirmation',
      '<b>WARNING!!!</b> Do you confirm close current action?',
      (data: ModalAlertResultModel) => {
        if (data.confirmed) {
          setTimeout(() => {
            this.flow.closeCurrentAction().then();
          });
        }
      }
    );
  }
}
