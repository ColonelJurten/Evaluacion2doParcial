import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 📌 Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage'; // Agregar Storage
import { environment } from './environments/environment.development';

// 📌 Importar Router para Standalone Apps
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // 📌 Firebase
    provideFirestore(() => getFirestore()), // 📌 Firestore
    provideStorage(() => getStorage()), // 📌 Agregamos Firebase Storage
    provideRouter(routes, withComponentInputBinding()) // 📌 Router
  ]
}).catch(err => console.error(err));
