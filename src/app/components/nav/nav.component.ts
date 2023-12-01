import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  activeMenu = false;
  counter = 0;
  correoUsuario = '';

  constructor( private storeService: StoreService,
              private authService: AuthService ){

  }

  ngOnInit(){
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  usuarioProfile(){
    this.authService.profile()
    .subscribe(
      (profile) => {
      this.correoUsuario = profile.email;
      });
  }
}
