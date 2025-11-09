import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Listas } from './componentes/listas/listas';
import { Detalhelista } from './componentes/detalhelista/detalhelista';

export const routes: Routes = [
  { path: '', component: Listas },
  { path: 'detalhe', component: Detalhelista}
];
