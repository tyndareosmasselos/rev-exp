import {
  Component,
  OnInit,
  forwardRef,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent implements OnInit, ControlValueAccessor {
  @Output() onSelectOption = new EventEmitter<any>();
  @Input() subject: Subject<any> = new Subject<any>();
  @Input() defaultValue: any;
  @Input() appearance: string = 'outline';
  @Input() floatLabel: string = 'always';
  @Input() selectOptions: any[] = [];
  @Input() valueType: string = 'object';
  @Input() displayMember: string = 'name';
  @Input() valueMember: string = 'id';
  @Input() errorMessage: string;
  @Input() label: string;
  @Input() hint: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() required: boolean;

  private optionsAreObjects = true;

  searchGroup: FormGroup;
  obs$: Observable<any>;
  temp: any[];

  constructor(private cdr: ChangeDetectorRef) { }

  propagateChange = (_: any) => { };
  propagateTouch: any = () => { };
  validateFn: any = () => { };

  get value(): any {
    return this.defaultValue;
  }

  set value(val) {
    this.defaultValue = val;
    this.propagateChange(this.defaultValue);
  }

  writeValue(val: any): void {
    if (val !== undefined && val != null) {
      if (this.selectOptions.length == 0) {
        this.selectOptions.push(val);
      } else {
        if (typeof val === "object") {
          let exist = this.selectOptions.some(x => x[this.valueMember] == val[this.valueMember])
          if (!exist) {
            this.selectOptions.push(val)
          }
        }
      }
      this.defaultValue = val;
      this.cdr.detectChanges();
    }
    if (val == null) {
      this.defaultValue = val;
      this.cdr.detectChanges();
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

  tempObj: any = {};


  ngAfterViewInit(): void {
    this.optionsAreObjects = this.selectOptions.some(x => typeof x == "string");

    if (this.value != null) {
      if (typeof this.value == 'object') {
        let index = this.selectOptions.findIndex(
          (x) => x[this.valueMember] == this.value[this.valueMember]
        );
        if (index < 0) {
          this.selectOptions.push(this.value);
        }
      }
      if (typeof this.value == 'string') {
        if (this.optionsAreObjects) {
          let index = this.selectOptions.findIndex((x) => x[this.valueMember] == this.value[this.valueMember]);
          if (index < 0) {
            this.selectOptions.push(this.value);
          }
        } else {
          let index = this.selectOptions.findIndex(x => x == this.value);
          if (index < 0) {
            this.selectOptions.push(this.value);
          }
        }

      }
      this.cdr.detectChanges();
    }
  }

  ngOnInit() {
    this.temp = this.selectOptions;
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  getDisplayMember(lu: any) {
    if (typeof lu === 'object') {
      return lu[this.displayMember];
    }
    return lu;
  }

  trackByOption(lu: any): string {
    return lu;
  }

  isChecked(value) {
    if (this.valueType == 'object') {
      return this.defaultValue[this.valueMember] == value[this.valueMember];
    } else {
      return this.defaultValue == value.id;
    }
  }

  getValueMember(lu: any) {
    let valueMember = this.valueMember;

    if (typeof lu === 'object') {
      return lu[valueMember];
    }

    return lu;
  }

  onClick(e) {
    this.value = e;
  }

  public objectComparisonFunction = (option, value): boolean => {
    if (value != null) {
      if (this.valueType == 'object') {
        return option[this.valueMember] == value[this.valueMember];
      } else {
        if (typeof option === 'object') {
          return option[this.valueMember] == value;
        } else {
          return option == value;
        }
      }
    }
    return false;
  };
}
