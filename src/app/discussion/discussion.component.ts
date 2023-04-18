import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  messages: string[] = [];
  message: string = '';
  socket: any;

  constructor() {
    this.socket = io('http://localhost:4200');
    this.socket.on('nouveau-message', (message: string) => {
      this.messages.push(message);
    });
  }

  ngOnInit(): void {
  }

  envoyerMessage(): void {
    if (this.message && this.message.trim() !== '') {
      this.socket.emit('nouveau-message', this.message);
      this.message = '';
    }
  }

}
