import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://localhost:3000/contacts';
  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get(this.url);
  }
  saveContact(data) {
    console.log("data from service save contact", data);
    return this.http.post(this.url, data);
  }

  getCurrentContact(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  updateContact(id, data) {
    console.log("id##:", id);
    console.log("data##:", data);
    return this.http.put(`${this.url}/${id}`, data);
  }

  search(data) {
    console.log("search data");
    return this.http.get(this.url + "?q=" + data);
  }
  // getCurrentContact(id) {
  //   console.log(id);
  //   return this.http.get(this.url + "?q=" + id);
  // }
}

