import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3003';
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/user/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, { withCredentials: true });
  }

  gets(uri: string) {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`, {
      withCredentials: true,
    });
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, {
      withCredentials: true,
    });
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, {
      withCredentials: true,
    });
  }

  delete(uri: string, payload: Object) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`, {
      withCredentials: true,
    });
  }
}
