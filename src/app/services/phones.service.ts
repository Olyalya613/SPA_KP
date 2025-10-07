import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({ providedIn: 'root' })
export class PhonesService {
  private base = 'api/phones';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.base);
  }

  getById(id: number): Observable<Phone> {
    return this.http.get<Phone>(`${this.base}/${id}`);
  }

  create(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.base, phone);
  }

  update(id: number, phone: Partial<Phone>): Observable<Phone> {
    return this.http.put<Phone>(`${this.base}/${id}`, { ...phone, id });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
