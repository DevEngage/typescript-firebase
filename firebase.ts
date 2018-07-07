import  * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import {User as FirebaseUser} from "@firebase/auth-types";

declare const FIREBASE_CONFIG;

class FirebaseHelper {

  private static instance: FirebaseHelper;

  user;
  firebase;
  firestore;
  auth;

  private constructor(protected config) {
    console.log('INITIALIZING FIREBASE');
    this.firebase = firebase.initializeApp(this.config);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  // Create a Singleton to help prevent initializing firebase more than once.
  static getInstance(config) {
    if (!FirebaseHelper.instance)  {
      FirebaseHelper.instance = new FirebaseHelper(config);
    }
    return FirebaseHelper.instance;
  }

  getUser(): FirebaseUser {
      return firebase.auth().currentUser;
  }

  /* TODO: */
  subscribeUser() {
    // return new Promise((resolve, reject) => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     this.user = user;
    //       resolve(user);
    //   });
    // });
  }

}

export const engageFire = FirebaseHelper.getInstance(FIREBASE_CONFIG);

export var User = (): any => { // this is the decorator factory
  if (!engageFire) {
    console.log('still loading helper');
  }
  return (target): FirebaseUser => { // this is the decorator
    // do something with 'target' and 'value'...
    console.log(target);
    return engageFire.getUser();
  }
};

export var Collection = (value: string): any => { // this is the decorator factory
  if (!engageFire) {
    console.log('still loading helper');
  }
  return (target): any => { // this is the decorator
    // do something with 'target' and 'value'...
    console.log(target)
    // console.log('target', engageFire.firestore.collection('test').get().then(r=>console.log(r)));
    return engageFire.firestore.collection(value);
  }
};

export var Doc = (value: string, id: string): any => { // this is the decorator factory
  if (!engageFire) {
    console.log('still loading helper');
  }
  return (target): any => { // this is the decorator
    // do something with 'target' and 'value'...
    console.log(target);
    return firebase.firestore().collection(value).doc(id).get();
  }
};

