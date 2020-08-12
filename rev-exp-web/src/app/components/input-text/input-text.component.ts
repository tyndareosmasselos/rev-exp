import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ElementRef,
  Renderer2,
  Optional,
  Injector,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterContentInit,
  Host,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
  FormControl,
  ControlContainer,
  ValidatorFn,
} from '@angular/forms';
import {  BehaviorSubject } from 'rxjs';

interface Validation {
  name?: string;
  message?: string;
  // validator: ValidatorFn;
}

const ERROR_MESSAGES = {
  "required": (name: string) => {
    return `${name} is required`
  }
}

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent
  implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() validations: Validation[] = [];
  @Input() subject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  @Input() hint: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMessage: string = '';
  @Input() appearance: string = 'outline';
  @Input() floatLabel: string = 'always';
  @Input() defaultValue: string = '';
  @Input() required: boolean;
  @Input() readonly: boolean;
  @Input() type: string = "text";

  errors = [];
  errorMessages = ERROR_MESSAGES;

  propagateChange = (_: any) => {};
  propagateTouch: any = () => {};
  validateFn: any = () => {};

  control: FormControl;

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    public hostElement: ElementRef,
    public renderer: Renderer2,
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  get value(): any {
    return this.defaultValue;
  }

  ngAfterContentInit() {
    this.initializeValidations();
  }

  initializeValidations() {
    const ngControl: NgControl = this.injector.get(NgControl, null);

    if (ngControl) {
      this.control = ngControl.control as FormControl;

      if (this.control != undefined) {
        let errors  = this.control?.errors;
        try {
          Object.keys(errors).forEach(key => {
            this.errors.push({
              name: key
            })
          })
        } 
        catch {

        }
        this.control.updateValueAndValidity();
      }

      this.cdr.detectChanges();
    }
  }

  hasError(validationName: string) {
    return this.control.hasError(validationName);
  }

  set value(val) {
    this.defaultValue = val;
    this.propagateChange(this.defaultValue);
  }

  writeValue(val: any): void {
    if (val !== undefined) {
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
    // this._renderer.setProperty(this.inputElementRef.nativeElement, 'disabled', isDisabled);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onTyping(e) {
    this.value = e.target.value;
  }
}
