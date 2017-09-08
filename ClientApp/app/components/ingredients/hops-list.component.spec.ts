import { assert } from 'chai';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HopsListComponent } from "./hops-list.component";
import { HopsItemComponent } from "./hops-item.component";
import { IngredientService } from "./shared/ingredient.service";

let fixture: ComponentFixture<HopsListComponent>;

class MockIngredientService extends IngredientService {

}

describe('Hops List component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(
            { declarations: [HopsListComponent,HopsItemComponent],
              providers: [{provide: IngredientService, useClass: MockIngredientService}]
            });
        fixture = TestBed.createComponent(HopsListComponent);
        //fixture.detectChanges();
    });

    it('should display the count of items', async(() => {
        //const titleText = fixture.nativeElement.querySelector('h1').textContent;

        //let div = fixture.nativeElement.querySelector('#numitems');
        //const numitems = div.textContent;
        //expect(numitems).toContain('Number of');
    }));

});

