import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/userInterfaces';
import { Observable } from 'rxjs';

const url = environment.backendLink;

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  public getCurrentUserInfo(): Observable<User> {
    return this.http.get<User>(`${url}/profile`);
  }

  public updateUserProfile(name: string, surname: string): Observable<User> {
    const customPatch = [{ name }, { surname }].reduce(
      (acc: Object[], item: Object) =>
        Object.values(item)[0]
          ? [
              ...acc,
              {
                op: 'replace',
                path: `/${Object.keys(item)[0]}`,
                value: Object.values(item)[0],
              },
            ]
          : acc,
      []
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
    });

    return this.http.patch<User>(`${url}/profile`, customPatch, { headers });
  }

  public changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<Object> {
    return this.http.put<Object>(`${url}/change-password`, {
      oldPassword,
      newPassword,
    });
  }
}
