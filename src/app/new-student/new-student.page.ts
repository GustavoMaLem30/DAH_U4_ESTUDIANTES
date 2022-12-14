import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {

  constructor(private fb: FormBuilder,private studentService:StudentService,private router:Router) { }
  public myForm: FormGroup;
  public validationMessages: Object;
  public careers: string[] = ['ISC', 'IQ', 'IBQ', 'ARQ']
  public student: Student;
  ngOnInit() {
    this.myForm = this.fb.group({
      // ? Rules Control number
      controlnumber: ["", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
      // ? Rules Name
      name: ["", Validators.required],
      // ? Rules CURP
      curp: ["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}' +
        '(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])' +
        '[HM]{1}' +
        '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)' +
        '[B-DF-HJ-NP-TV-Z]{3}' +
        '[0-9A-Z]{1}' +
        '[0-9]{1}$')])],
      // ? Rules Age
      age: ["", Validators.compose([Validators.required, Validators.min(18)])],
      // ? Rules NIP
      nip: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(10000)])],
      // ? Rules EMAIL
      email: ["", Validators.compose([Validators.required, Validators.email])],
      // ? Rules CAREER
      career: ["", Validators.required],
      // ? Rules URL
      // ! Test: https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg
      photo: ["", Validators.compose([Validators.required, Validators.pattern('^(ftp|http|https){1}' +
        '[:]{1}' +
        '[/]{2}' +
        '[a-zA-Z0-9@:%._\+~#=]{2,256}' +
        '[.]{1}' +
        '[a-z]{2,6}' +
        '[a-zA-Z0-9@:%._\+~#&?=/-]*$')])]
    });
    this.validationMessages = {
      // ? Validation Message controlnumber
      controlnumber: [
        { type: 'required', message: "N??mero de control obligatorio" },
        { type: 'minlength', message: "El N??mero de control 8 car??cteres m??nimo" },
        { type: 'maxlength', message: "El N??mero de control 8 car??cteres maximo" },
        { type: 'pattern', message: "Solo n??meros" }
      ],
      // ? Validation Message NAME
      name: [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      // ? Validation Message CURP
      curp: [
        { type: 'required', message: "CURP obligatoria " },
        { type: 'pattern', message: "Formato incorrecto" }
      ],
      // ? Validation Message AGE
      age: [
        { type: 'required', message: "Edad obligatoria " },
        { type: 'min', message: "La edad minima es 18" }
      ],
      // ? Validation Message NIP
      nip: [
        { type: 'required', message: "NIP obligatorio" },
        { type: 'min', message: "NIP incorrecto" },
        { type: 'max', message: "NIP incorrecto" }
      ],
      // ? Validation Message EMAIL
      email: [
        { type: 'required', message: "Correo Obligatorio" },
        { type: 'email', message: "Correo invalido" }
      ],
      // ? Validation Message CAREER
      career: [
        { type: 'required', message: "Carrera obligatoria" }
      ],
      // ? Validation Message PHOTO
      photo: [
        { type: 'required', message: "url obligatoria " },
        { type: 'pattern', message: "URL incorrecta (ej. https://www.picsum.photos/id/1/200/300)" }
      ]
    }
  }
  public newStudent(){
    this.student = {
      controlnumber: this.myForm.controls.controlnumber.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      photo: this.myForm.controls.photo.value,
      career: this.myForm.controls.career.value,
    }
    this.studentService.newStudent(this.student);
    this.router.navigate(['/home'], {
    });
  }

}
