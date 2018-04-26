import {ContentChild, Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {repeat, switchMap, take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  /*makes visible that directive is active*/
  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();
  @Input('appDraggable') typeMode: number;


  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    this.pointerDown.next(event);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
      this.pointerMove.next(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
      this.pointerUp.next(event);
  }

  ngOnInit(): void {
    /* Stream of dragStart*/
    this.pointerDown.asObservable()
        .subscribe(event => {
          this.dragging = true;
          event.stopPropagation();
          this.dragStart.emit(event);
        });
    /* Stream of dragMove*/
    this.pointerDown.pipe(
        switchMap(() => this.pointerMove),
        takeUntil(this.pointerUp),
        repeat()
    ).subscribe(event => this.dragMove.emit(event));
    /* Stream of dragEnd*/
    this.pointerDown.pipe(
        switchMap(() => this.pointerUp),
        take(1),
        repeat()
    ).subscribe(event => {
        this.dragging = false;
        this.dragEnd.emit(event);
    });
  }
}
