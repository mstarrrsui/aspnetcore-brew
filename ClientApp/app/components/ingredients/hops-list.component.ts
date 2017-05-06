import { Component, OnInit } from "@angular/core";
import { IngredientService } from "./shared/ingredient.service";
import { Hop } from "./model/hop.model";
import { ToastrService } from "../common/toastr.service";

@Component({
    selector: "hops-list",
    templateUrl: "app/ingredients/hops-list.component.html"
})
export class HopsListComponent implements OnInit {

    hopdata: Hop[];

    constructor(private ingredientService: IngredientService, private toastr: ToastrService) { }

    ngOnInit() {
        this.ingredientService.getHops().subscribe( data => this.hopdata = data);
    }

    handleItemClicked(item: Hop) {
        console.log("received:", item.name);
        this.toastr.success(item.name);
    }
}
