import { Component } from '@angular/core';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
//import { Observable } from 'rxjs/Observable';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	
	async successToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Posted to server!',
      duration: 3000
    });
    toast.present();
  }
  
  async failToast(message) {
    const toast = await this.toastController.create({
      message: 'OOPS Failed to Post to server!'+message,
      duration: 3000
    });
    toast.present();
  }
  
 async invalidURLToast() {
    const toast = await this.toastController.create({
      message: 'InValid WEB URL',
      duration: 3000
    });
    toast.present();
  }
  

  // DI barcodeScanner
  constructor(private barcodeScanner: BarcodeScanner,private storage: Storage,
  public toastController: ToastController,public http: HTTP) { 
 
  }
  
    // store the scanned result
	num: string;

	web_url:string;
	
	getValue(){
    this.storage.get("weburl").then((data)=>{
      console.log("DATA IN GETVALUE"+data);
	  this.web_url=data.path;
	  this.process_web_request();
    })
  }
  
  /* process_web_request(){
	  	if(this.isURL()){
		 this.httpClient.get( this.web_url+this.num ) 
		 .subscribe(
        data => this.successToast(),
        error => this.failToast(this.web_url)
      );
		}else{
			
			this.invalidURLToast()
		}
	  
  }  */
  
  
  
  process_web_request(){
	  	if(this.isURL()){
		 
		 
		 this.http.get(this.web_url+this.num, {}, {})
			  .then(data => {

				console.log(data.status);
				console.log(data.data); // data received by server
				console.log(data.headers);
				this.successToast()
			  })
			  .catch(error => {
				console.log(this.web_url+this.num);
				console.log(error.status);
				console.log(error.error); // error message as string
				console.log(error.headers);
				this.failToast(this.web_url)

			  });
		 
		 
		 
		 
		}else{
			
			this.invalidURLToast()
		}
	  
  }
  
  
  
  testmethod(){
  this.getValue();
 // console.log("gkVER1>>>"+this.web_url);
  }
  
 
	

	
 isURL() {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(this.web_url);
}

scanData : {};
options :BarcodeScannerOptions;

scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

        console.log(barcodeData);
		
        this.scanData = barcodeData.text;
		this.num = barcodeData.text
		this.getValue();
		
	    
	
	
    }, (err) => {
        console.log("Error occured : " + err);
    });         
}   


}
