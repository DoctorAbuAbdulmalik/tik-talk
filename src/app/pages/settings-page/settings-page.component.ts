import {Component, effect, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  inputPlaceholder = 'Введите данные'
  profileService = inject(ProfileService)

  fb = inject(FormBuilder)
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack)
      })
    });
  }

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) return

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile( {
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | string[] | undefined){
    if(!stack) return []
    if(Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if(!stack) return ''
    if(Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
