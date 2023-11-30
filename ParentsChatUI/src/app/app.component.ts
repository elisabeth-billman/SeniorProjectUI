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
  userInput: string = ''; // Input field value for user messages
  messages: Message[] = []; // Array to store chat messages
  title: any; // Not used in this component
  apiResponse: any; // Not used in this component

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.addGreetingMessage(); // Display greeting message when the component initializes
  }

  addGreetingMessage(): void {
    const greetingMessage: Message = {
      content: "👋 Welcome to LittleLifeline! Your go-to support for all things parenting. Whether you have a question about a mysterious rash, need tips to tame tantrums, or want guidance on your childs milestones, we're here for you. Ask away! 🌟",
      isUser: false
    };
    this.messages.push(greetingMessage); // Add greeting message to the chat messages array
  }


  sendMessage(): void {
    const message = this.userInput.trim(); // Get the user's input message and remove leading/trailing whitespace

    if (message !== '') { // Check if the message is not empty
      const newMessage: Message = { content: message, isUser: true };
      this.messages.push(newMessage); // Add user's message to the chat messages array
      this.userInput = ''; // Clear the input field

      this.apiService.askQuestion(message).subscribe(
        (response: any) => {
          const answer: string = response.choices[0].message.content; // Extract the answer from the response
          const newResponse: Message = { content: answer, isUser: false };
          this.messages.push(newResponse); // Add the response message to the chat messages array
        },
        (error) => {
          console.log('Error:', error); // Log any errors that occur during the API request
        }
      );
    }
  }
}
