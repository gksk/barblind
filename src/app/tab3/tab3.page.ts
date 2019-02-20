import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})



export class Tab3Page {
	
	 async testToast() {
    const toast = await this.toastController.create({
      message: 'called ionViewDidLoad',
      duration: 2000
    });
    toast.present();
  }
	
	
	
   async presentToast() {
    const toast = await this.toastController.create({
      message: 'New Web server URL saved.',
      duration: 2000
    });
    toast.present();
  }
	
	public dataToStore;
	public weburl = {}
	
  constructor(private storage: Storage,public toastController: ToastController) {
	  
	  this.getValue();
    this.dataToStore={
      name:'blind2curtain_barcode',
      site:'www.blind2curtainx.com'
    }
  }
  
  web_url: string;

   ionViewDidLoadxx() {
    // Put here the code you want to execute
	  this.getValue();
	  this.testToast();
  }
  
  
 
  setValue(){
    this.storage.set("weburl",this.weburl).then((successData)=>{
      console.log("Data Stored");
      console.log(successData);
	  this.presentToast();
	  
    })
  }
  getValue(){
    this.storage.get("weburl").then((data)=>{
      console.log(data);
	  this.web_url=data.path;
	  this.weburl=data;
    })
  }
	
	
	
	

	
	
}
