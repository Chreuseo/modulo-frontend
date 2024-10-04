import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PdfService extends BaseService {
  private readonly endpoint = 'pdf'; // Define your SPO endpoint

  constructor(protected override router: Router,
              protected override http: HttpClient) {
    super(router, http);
  }

  downloadModuleManual(spoId: number): Observable<Blob> {
    return this.getBlob(`${this.endpoint}/generateModuleManual/${spoId}`);
  }

}
