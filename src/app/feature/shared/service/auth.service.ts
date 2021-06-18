import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from "rxjs/operators";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {}

  async loginGoogle() {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try{
      await this.afAuth.signOut();
    }
    catch (error) {
      console.log(error)
    }
  }

  getCurrentUser() {
    try{
      return this.afAuth.authState.pipe(first()).toPromise();
    }
    catch (error) {
      console.log(error)
    }
  }


}
