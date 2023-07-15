import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../core/modules/modal/modal.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-register-success-modal',
  templateUrl: './register-success-modal.component.html',
  styleUrls: ['./register-success-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterSuccessModalComponent {
  constructor(private modalService: ModalService, private route: Router) {}

  public role$ = new Subject<string>();
  public close(): void {
    this.modalService.close();
    this.route.navigate(['']);
  }

  protected readonly Observable = Observable;
  protected readonly Object = Object;
}
