import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl:  './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  ServerName = 'TestServer';
  serverCreated = false;
  servers = ['testS', 'testS2'];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
   }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.ServerName);
    this.serverCreationStatus = 'Server "'+this.ServerName+'" is created!' ;
  }

  onUpdateServerName(event:Event) {
    this.ServerName =(<HTMLInputElement>event.target).value;
  }

}
