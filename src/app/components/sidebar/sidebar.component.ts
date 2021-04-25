import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/labels', title: 'Etiquetas',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/groups', title: 'Grupos',  icon:'ni-ruler-pencil text-blue', class: '' },
    { path: '/students', title: 'Estudiantes',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/student-profile', title: 'Perfil del estudiante',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/problemas', title: 'Problemas',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
