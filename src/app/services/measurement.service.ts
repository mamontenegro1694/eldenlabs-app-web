import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../models/measurement.interface';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(startDate: string | null = null, endDate: string | null = null): Observable<Array<Measurement>> {
    let params = new HttpParams();

    if (startDate != null && endDate != null) {
      params = params.appendAll({ startDate, endDate });
    }

    return this.httpClient.get<Array<Measurement>>(`${this.apiUrl}/measurements`, { params });
  }
}
