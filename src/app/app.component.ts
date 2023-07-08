import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

interface Message {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userInput: string = '';
  messages: Message[] = [];
  title: any;
  apiResponse: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.addGreetingMessage();
  }

  addGreetingMessage(): void {
    const greetingMessage: Message = {
      content: "Hello! Welcome to Gospel Insights, I'm here to assist you on your spiritual journey and help answer questions. Ask me anything!",
      isUser: false
    };
    this.messages.push(greetingMessage);
  }


  sendMessage(): void {
    const message = this.userInput.trim();
    if (message !== '') {
      const newMessage: Message = { content: message, isUser: true };
      this.messages.push(newMessage);
      this.userInput = '';

      this.apiService.askQuestion(message).subscribe(
        (response: any) => {
          const answer: string = response.choices[0].message.content;
          const newResponse: Message = { content: answer, isUser: false };
          this.messages.push(newResponse);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
}
