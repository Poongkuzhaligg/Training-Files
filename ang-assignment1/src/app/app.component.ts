import { Component, OnInit, VERSION } from '@angular/core';
import { userData } from './user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  
  name = 'Angular ' + VERSION.major;

  userData: userData[] = [
    {
      name: 'John',
      designation: 'Software developer',
      city: 'Seattle',
      university: 'Seattle state university',
      imgUrl:
        'https://www.soschildrensvillages.ca/sites/default/files/news/jhon-freddy-500x500.jpg',
    },
    {
      name: 'Hagrid',
      designation: 'Software director',
      city: 'Chicago',
      university: 'Chicago state university',
      imgUrl:
        'https://i.pinimg.com/736x/41/8e/3c/418e3cde3884786d89da589b09d416fb--robbie-coltrane-hogwarts-professors.jpg',
    },
    {
      name: 'George',
      designation: 'CEO',
      city: 'Atlanta',
      university: 'Atlanta state university',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/8/8d/George_Clooney_2016.jpg',
    },
    {
      name: 'Jimmy',
      designation: 'UX designer',
      city: 'Atlanta',
      university: 'Atlanta state university',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/9/9e/Jimmy_Fallon%2C_Montclair_Film_Festival%2C_2013.jpg',
    },
  ];

  ngOnInit(): void {

  }



}
