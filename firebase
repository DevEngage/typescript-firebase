
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';

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
  static getInstance() {
    if (!FirebaseHelper.instance)  {
      FirebaseHelper.instance = new FirebaseHelper();
    }
    return FirebaseHelper.instance;
  }

}

export let engageFire = FirebaseHelper.getInstance();

export var User = (): any => { // this is the decorator factory
  if (!engageFire) {
    console.log('still loading helper');
  }
  return (target): any => { // this is the decorator
    // do something with 'target' and 'value'...
    console.log(target);
    return engageFire.user;
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

