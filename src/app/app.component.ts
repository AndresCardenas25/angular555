import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { Auth } from './models/auth.model';
import { FilesService } from './services/files.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  imgRta = '';

  constructor ( private authService: AuthService,
                private userService: UsersService,
                private filesServices: FilesService,) {
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
    // .pipe(
    //   switchMap( (data: Auth) => {
    //       this.token = data.access_token;
    //       return this.authService.profile(data.access_token);
    //     })
    // )
    .subscribe(token => {
      console.log(token);
    }
  )}

  getProfile(){
    this.authService.profile()
    .subscribe(profile => {
      console.log(profile);
    }
    )}

  downloadPdf(){
    this.filesServices.getFiles('my-pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesServices.uploadFile(file)
      .subscribe( rta => {
      this.imgRta = rta.location;
    })
    }
  }


}
