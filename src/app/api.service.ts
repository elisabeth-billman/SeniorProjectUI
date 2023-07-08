import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ChatMessage {
  role: string;
  content: string;
}

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
  private apiUrl = 'http://localhost:8000/ask'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  askQuestion(question: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ] as ChatMessage[]
    };

    return this.http.post<APIResponse>(this.apiUrl, requestBody, { headers });
  }
}
