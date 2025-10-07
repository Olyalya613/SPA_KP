import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhonesService } from './phones.service';
import { Phone } from '../models';

describe('PhonesService',()=>{let s:PhonesService;let http:HttpTestingController;beforeEach(()=>{TestBed.configureTestingModule({imports:[HttpClientTestingModule]});s=TestBed.inject(PhonesService);http=TestBed.inject(HttpTestingController)});afterEach(()=>http.verify());
 it('list() should GET phones',()=>{const mock:Phone[]=[{id:1,brand:'A',model:'B',os:'Android',price:1,released:2020}];s.list().subscribe(d=>expect(d).toEqual(mock));const req=http.expectOne('api/phones');expect(req.request.method).toBe('GET');req.flush(mock);});});
