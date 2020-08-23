import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {

  readonly firebaseConfig = {
    apiKey: 'AIzaSyCNFGxhRfb6IqyIzbUdq7lrMmBGMKzqA58',
    authDomain: 'beton-my-life--user.firebaseapp.com',
    databaseURL: 'https://beton-my-life--user.firebaseio.com',
    projectId: 'beton-my-life--user',
    storageBucket: 'beton-my-life--user.appspot.com',
    messagingSenderId: '616811524845',
    appId: '1:616811524845:web:e0bbedf622450b163d92e4',
    measurementId: 'G-MS4JW9ZJS1',
  };

  public getFirebaseConfig() {
    return this.firebaseConfig;
  }

  public getUserDb(){
    return 'https://beton-my-life--user.firebaseio.com/users.json'
  }

}
