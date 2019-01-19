import firebase from 'firebase';

import {config} from './../assets/apiKey';

firebase.initializeApp(config);

export default firebase;