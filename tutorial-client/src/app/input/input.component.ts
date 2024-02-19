import { Component, input, model, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useClass: InputComponent,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  /// Signal
  /// 값을 저장하는 주머니
  /// 주머니 내용물이 변할 때 마다 알려줌
  value = '';
  type = input()
  placeholder = input()

  onChange = (value: any) => null;
  onTouched = (value: any) => null;
  disabled = signal<boolean>(false)

  writeValue(obj: any): void {
    this.value = obj
    console.log({value: this.value, obj})
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }


  handleInput(ev: any) {
    const value = ev.target.value
    this.value= value
   this.onChange(this.value)
  }

}
