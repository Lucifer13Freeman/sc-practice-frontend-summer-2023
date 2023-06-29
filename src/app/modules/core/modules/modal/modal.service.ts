import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IModalData } from './interfaces/modal-data.interface';

@Injectable()
export class ModalService {
  private modalSequence: Subject<IModalData | null> = new Subject();
  private confirm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public open(componentObj: IModalData): void {
    this.modalSequence.next(componentObj);
  }

  public get modalSequence$(): Observable<IModalData | null> {
    return this.modalSequence.asObservable();
  }

  public close(): void {
    this.modalSequence.next(null);
  }

  public confirmSend(event$: boolean): void {
    this.confirm.next(event$);
  }

  public get confirmSequence$(): Observable<boolean> {
    return this.confirm.asObservable();
  }
}
