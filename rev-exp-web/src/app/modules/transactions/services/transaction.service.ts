import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TransactionModel } from '../../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly baseURL = environment.api + "/transaction/";

  constructor(private http: HttpClient) { }

  // Get all transactions
  getAll(){
    return this.http.get(this.baseURL);
  }

  // Delete a transaction
  async delete(id: string){
    this.http.delete(this.baseURL + id).pipe(map(x => {
      return x;
    })).toPromise()
  }

  // Create a transaction
  create(transaction: TransactionModel){
    return this.http.post(this.baseURL, transaction).pipe(map(x => x)).toPromise();
  }

  // Update a transaction
  update(transaction: TransactionModel){
    return this.http.put(this.baseURL + transaction._id, transaction).pipe(map(x => x)).toPromise();
  }

}
