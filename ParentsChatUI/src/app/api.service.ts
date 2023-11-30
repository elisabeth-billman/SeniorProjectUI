import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interface for the chat message structure
interface ChatMessage {
  role: string;
  content: string;
}

// Interface for the API response structure
interface APIResponse {
  choices: {
    message: {
      content: string;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/ask'; // API URL with ask endpoint

  constructor(private http: HttpClient) { }

  askQuestion(question: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Create the request body with the model and messages
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ] as ChatMessage[]
    };

    // Send the POST request to the API with the request body and headers
    return this.http.post<APIResponse>(this.apiUrl, requestBody, { headers });
  }
}
