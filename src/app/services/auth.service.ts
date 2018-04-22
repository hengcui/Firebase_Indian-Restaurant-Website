import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  signUp() {

  }

  logIn(user: any) {
    this.afAuth.auth.signInWithEmailAndPassword(user.username, user.password)
    .then(res => console.log('Got Login Information: ', res))
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
