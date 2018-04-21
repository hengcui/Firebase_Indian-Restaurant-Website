import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class FeedbackService {
  private currentUser: firebase.User = null;
  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService,
              private afs: AngularFirestore,
              private authService: AuthService) {
                this.authService.getAuthState()
                .subscribe( (user) => {
                  if (user) {
                    this.currentUser = user;
                  } else {
                    this.currentUser = null;
                  }
                });
              }

  submitFeedback(feedback: Feedback): Promise<any> {
    if (this.currentUser) {
      return this.afs.collection('feedback').add(
        {
          author: {
            '_id': this.currentUser.uid,
            'firstname' : feedback.firstname,
            'lastname': feedback.lastname
          },
          telnum: feedback.telnum,
          email: feedback.email,
          agree: feedback.agree,
          contactType: feedback.contacttype,
          message: feedback.message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
      Promise.reject(new Error('No User log in!'));
    }
  }
}
