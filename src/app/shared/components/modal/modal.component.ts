import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core'
import { MainService } from '../../../services/main.service'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { LocationService } from '../../../services/location.service'

declare var bootstrap: any

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{

    @ViewChild('modal') locationModal!: ElementRef
    form!: FormGroup
    show = signal(false)
    private locationService = inject(LocationService)
    private fb = inject(FormBuilder)
  
    ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      })
    }
  
    openModal() {
      this.show.set(true)
    }
  
    closeModal() {
      this.show.set(false)
      this.form.reset()
    }
  
    isFieldInvalidAndTouched(name: string): boolean {
      return this.form.get(name)!.invalid && this.form.get(name)!.touched
    }
  
    guardarUbicacion() {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched()
      })
  
      if (this.form.valid) {
        this.locationService.newLocation(this.form.value)
        this.closeModal()
      }
    }
  }
