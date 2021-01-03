import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Test } from "./test.model";


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  createTest(test: Test){
    return this.http.post("http://192.168.0.108/tests",test);
  }

  getTest(testID: string){
    return this.http.get("http://192.168.0.108/tests/"+testID);
  }
}
