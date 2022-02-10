import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  see=0;
  operation="";
  currentItem="";
  mobileQuery: MediaQueryList;
  shouldRun=true;
  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}   `);

  private _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher,
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.matIconRegistry.addSvgIcon(
      "home",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/house-user-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "dashboard",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/gauge-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "order",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/jedi-order-brands.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "logout",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/arrow-right-from-bracket-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "about",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/address-card-solid.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "search_bar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/magnifying-glass-solid.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "github_bar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/github-brands.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "google_bar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/google-brands.svg")
    );
    
  }
  seeTable(num:number){
    console.log(num)
    this.see = num;
    if(num==2){
      this.currentItem = "EmpDetails";
    }else{
      this.currentItem = "SalDetails";
    }
  }
  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onTab(name:string){
    this.operation = name;
  }
}
