import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServicesService } from '../data-services.service';
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LineController, LineElement, PointElement, LinearScale } from "node_modules/chart.js";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  covidData: any = [];
  countries: any = [];
  countryNumber: number = 0;
  currentPage:number=1;
  nextPage:number=2;
  nextNextPage:number=3;
  countryArray:any=[];
  countryContentArray:any=[];
   myChart:any;
  constructor(private router: Router, private service: DataServicesService) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LineController, LineElement, PointElement, LinearScale)
  }

  ngOnInit(): void {
    this.service.getData().subscribe((data) => {
      this.covidData = data;
      this.displayCountries();
      this.myCanvas();
      // this.countryArray[0]=this.covidData.Countries[0];
     
    });
    if (localStorage.getItem("countryNumber") == null) {
      this.countryNumber = 0;
    }
    else {
      this.countryNumber = JSON.parse(localStorage.getItem("countryNumber"));
      this.currentPage=JSON.parse(localStorage.getItem("currentPage"));
      this.nextPage=JSON.parse(localStorage.getItem("nextPage"));
      this.nextNextPage=JSON.parse(localStorage.getItem("nextNextPage"));
    }
  }

  changePageNumber(value: number) {
    if(this.currentPage==1 && value==-1){
        alert("You Are On First Page. Can't Go Back.");
        return;
    }
    // this.onFirstPage=false;
    // console.log(this.countryNumber);
    this.myChart.destroy();
    if (value == 1) {
      this.currentPage=this.nextPage;
      this.nextPage=this.nextNextPage;
      this.nextNextPage+=1;
      this.countryNumber += 5;
      localStorage.setItem("countryNumber", JSON.stringify(this.countryNumber));
      localStorage.setItem("currentPage", JSON.stringify(this.currentPage));
      localStorage.setItem("nextPage", JSON.stringify(this.nextPage));
      localStorage.setItem("nextNextPage", JSON.stringify(this.nextNextPage));
    }
    if (value == 2) {
      this.currentPage=this.nextNextPage;
      this.nextPage=this.nextNextPage+1;
      this.nextNextPage+=2;
      this.countryNumber += 10;
      localStorage.setItem("countryNumber", JSON.stringify(this.countryNumber));
      localStorage.setItem("currentPage", JSON.stringify(this.currentPage));
      localStorage.setItem("nextPage", JSON.stringify(this.nextPage));
      localStorage.setItem("nextNextPage", JSON.stringify(this.nextNextPage));
    }
    if (value == -1) {
      this.nextNextPage=this.nextPage;
      this.nextPage=this.currentPage;
      this.currentPage-=1;
      this.countryNumber -= 5;
      localStorage.setItem("countryNumber", JSON.stringify(this.countryNumber));
      localStorage.setItem("currentPage", JSON.stringify(this.currentPage));
      localStorage.setItem("nextPage", JSON.stringify(this.nextPage));
      localStorage.setItem("nextNextPage", JSON.stringify(this.nextNextPage));
    } 
    this.displayCountries();
    this.myCanvas(); 
  }

 
  myCanvas() {
     this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: [this.countryArray[0].Country,
         this.countryArray[1].Country,
         this.countryArray[2].Country,
         this.countryArray[3].Country,
         this.countryArray[4].Country],
        datasets: [
          {
            label: 'no. of TotalConfirmed Cases',
            data: [this.countryArray[0].TotalConfirmed,
            this.countryArray[1].TotalConfirmed,
            this.countryArray[2].TotalConfirmed,
            this.countryArray[3].TotalConfirmed,
            this.countryArray[4].TotalConfirmed,
            ],
            backgroundColor: [
              'rgba(240, 67, 111, 0.7)'
            
            ],
            borderColor: ['black'],
            borderWidth: 1
          },
          {
            label: 'no. of TotalDeaths Cases',
            data: [this.countryArray[0].TotalDeaths,
            this.countryArray[1].TotalDeaths,
            this.countryArray[2].TotalDeaths,
            this.countryArray[3].TotalDeaths,
            this.countryArray[4].TotalDeaths,
            ],
            backgroundColor: [
              'rgba(240, 0, 0, 1)'
            ],
            borderColor: [
              'black'
            ],
            borderWidth: 1
          },
          {
            label: 'no. of TotalRecovered Cases',
            data: [ this.countryArray[0].TotalRecovered,
            this.countryArray[1].TotalRecovered,
            this.countryArray[2].TotalRecovered,
            this.countryArray[3].TotalRecovered,
            this.countryArray[4].TotalRecovered,
            ],

            backgroundColor: [
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]

      },
      options: {
        scales: {
          yAxes: {
            beginAtZero: true,
          }
        }
      }
    });
  }

  displayCountries(){
    let j=0;
      j=this.countryNumber;
      console.log(j);
      for(let i=0;i<5;i++){ 
       
        if(this.covidData.Countries[j]==undefined){
          this.countryArray[i]={};
          // break;
        }      
        else{
          this.countryArray[i]=this.covidData.Countries[j];
          j++; 
        }        
      }     
      this.countryArray.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1);    
  }
}


