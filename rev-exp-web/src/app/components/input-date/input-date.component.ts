import {
  Component,
  OnInit,
  forwardRef,
  Input,
  isDevMode,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ANY_DATE_FORMAT } from './components/date-formatter';
@Component({
  selector: 'input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: ANY_DATE_FORMAT }
  ]
})
export class InputDateComponent implements OnInit, ControlValueAccessor {
  @Input() icon: string;
  @Input() hint: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMessage: string;
  @Input() appearance: string = "outline";
  @Input() floatLabel: string = "always";
  @Input() defaultValue: Date;
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;

  propagateChange = (_: any) => {};
  propagateTouch: any = () => {};
  validateFn: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  get value(): any {
    return this.defaultValue;
  }

  set value(val) {
    if (isDevMode())
    this.defaultValue = val;
    this.propagateChange(this.defaultValue);
  }

  writeValue(val: any): void {
    if (val !== undefined) {
      this.defaultValue = val;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
}
