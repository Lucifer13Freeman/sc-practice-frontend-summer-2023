import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './modal.service';
import { IModalData } from './interfaces/modal-data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);

  @ViewChild('modalContent', { read: ViewContainerRef })
  public modalContent!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;
  public isOpen: boolean = false;

  constructor(
    private readonly modalService: ModalService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.modalService.modalSequence$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: IModalData | null) => {
        if (!data) {
          this.close();
          return;
        }
        this.isOpen = true;
        this.componentRef = this.modalContent.createComponent(data.component);

        Object.keys(data.context).forEach((propName: string) => {
          this.componentRef.instance[propName] = data.context[propName];
        });
        this.cdr.detectChanges();
      });
  }

  @HostListener('window:keyup', ['$event.keyCode'])
  public close(code: number = 27): void {
    if (code !== 27) {
      return;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.isOpen = false;
  }
}
