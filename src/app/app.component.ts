import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { switchMap } from 'rxjs';
import { Auth } from './models/auth.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  correoUsuario = '';

  constructor ( private authService: AuthService,
                private userService: UsersService) {
  }

  toogleImg(){
    this.showImg = !this.showImg;
  }

  onLoaded(img: string){
    console.log('log padre', img);
  }

  createUser(){
    this.userService.create({
      name: 'andres',
      email: 'hojsak@gmail.com',
      password: '232323'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  login(){
    this.authService.login('hojsak@gmail.com', '232323')
    .pipe(
      switchMap( (data: Auth) => {
          this.token = data.access_token;
          return this.authService.profile(data.access_token);
        })
    )
    .subscribe(profile => {
      this.correoUsuario = profile.email;
    }
  )}

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile);
    }
    )}
}
