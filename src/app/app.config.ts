import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AparelhosComponent } from './pages/aparelhos/aparelhos.component';

export const routes: Routes = [
  { path: '', component: AparelhosComponent },
  { path: '**', redirectTo: '' }
];
