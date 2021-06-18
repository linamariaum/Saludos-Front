import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Alert } from '../shared/model/alert';
import { Idiom } from '../shared/model/idiom';
import { IdiomsService } from '../shared/service/idioms.service';
import { TalkService } from '../shared/service/talk.service';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers : [TalkService, IdiomsService]
})
export class HomeComponent implements OnInit {
  title = 'Traducción'
  items = [
    {code: 'ingles',
    value: 'Ingles'},
    {code: 'espanol',
    value: 'Español'}]
  translateForm: FormGroup;
  response = '';

  constructor(private talkService: TalkService, private idiomService: IdiomsService) {
    this.translateForm = new FormGroup({
      nameInput: new FormControl(sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '', [Validators.required]),
      idiomInput: new FormControl('ingles', [Validators.required])
    });
  }

  async ngOnInit() {
    await this.loadIdioms()
    if (sessionStorage.getItem('name')) {
      //this.sayGreet();
    }
  }

  async loadIdioms() {
    await this.idiomService.getIdioms().then(
      (data) => {
        if(data && data.length > 0) {
          const result = JSON.parse(data);
          this.items = []
          result.forEach(element => {
            let lenguage: Idiom = {
              code: element.code,
              value: element.value
            };
            this.items.push(lenguage);
          });
        }
      }, (error) => {
        const mensaje = JSON.parse(error.error);
        Alert.mostrarAlertInfo('Información', `${mensaje.mensaje}`);
      }
    )
  }

  getErrorMessage() {
    return this.translateForm.get('nameInput').hasError('required') ? 'Debe ingresar un nombre' : '';
  }

  async sayGreet() {
    await this.talkService.getMessageGreeting(this.translateForm.get('idiomInput').value).then(
      (data) => {
        if(data && data.length > 0) {
          const result = JSON.parse(data);
          this.response = result.msm + ' ' + this.translateForm.get('nameInput').value +'!'
          //this.translateForm.reset();
        } else {
          Alert.mostrarAlertInfo('Información','No se pudo realizar la traducción.');
        }
      }, (error) => {
        console.log(error)
        const mensaje = JSON.parse(error.error);
        Alert.mostrarAlertInfo('Información', `${mensaje.mensaje}`);
      }
    );
  }

  async sayName() {
    await this.talkService.getMessageName(this.translateForm.get('idiomInput').value).then(
      (data) => {
        if(data && data.length > 0) {
          const result = JSON.parse(data);
          this.response = result.msm + ' ' + this.translateForm.get('nameInput').value +'!'
          //this.translateForm.reset();
        } else {
          Alert.mostrarAlertInfo('Información','No se pudo realizar la traducción.');
        }
      }, (error) => {
        const mensaje = JSON.parse(error.error);
        Alert.mostrarAlertInfo('Información', `${mensaje.mensaje}`);
      }
    );
  }

  async sayGoodbye() {
    await this.talkService.getMessageGoodBye(this.translateForm.get('idiomInput').value).then(
      (data) => {
        if(data && data.length > 0) {
          const result = JSON.parse(data);
          this.response = result.msm + ' ' + this.translateForm.get('nameInput').value +'!'
          //this.translateForm.reset();
        } else {
          Alert.mostrarAlertInfo('Información','No se pudo realizar la traducción.');
        }
      }, (error) => {
        const mensaje = JSON.parse(error.error);
        Alert.mostrarAlertInfo('Información', `${mensaje.mensaje}`);
      }
    );
  }

}
