/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
// import { assert } from 'chai';
import { TestBed, async, inject } from '@angular/core/testing';
import { IngredientService } from "./ingredient.service";
import {
    BaseRequestOptions, RequestOptions, Response,
    ResponseOptions, ConnectionBackend, Http
} from "@angular/http";
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('Ingredient Service component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: RequestOptions, useClass: BaseRequestOptions },
                { provide: ConnectionBackend, useClass: MockBackend },
                Http,
                IngredientService
            ]
        });
    });

    it('should return some hops',
        inject([ConnectionBackend, IngredientService],
            (backend: MockBackend, service: IngredientService) => {
                //Setup
                let items = null;
                backend.connections.subscribe((c: MockConnection) => {
                    expect(c.request.url).toEqual('/api/ingredient/hops');
                    c.mockRespond(new Response(
                        new ResponseOptions(
                            {
                                body: `{
                                "data": [{
                                        "hsi": "15.0000000",
                                        "id": "0",
                                        "type": "Bittering",
                                        "betaAcid": "5.6000000",
                                        "description": "Bittering hops derived from Wye Challenger.  Good high-alpha bittering hops.  Used for: Ales   Aroma: Primarily for bittering   Substitutes: Target,  Northdown,  Challenger",
                                        "alphaAcid": "14.7500000",
                                        "useIn": "Boil",
                                        "name": "Admiral",
                                        "countryOfOrigin": "United Kingdom"
                                    }
                                ]
                            }`
                            })));
                });

                //Do it
                service.getHops().subscribe((q) => {
                    items = q;
                });

                //Assert
                backend.verifyNoPendingRequests();
                expect(items.length).toBe(1);
            }));
});
