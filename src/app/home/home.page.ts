import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  taskList: any[] = [];

  constructor(private alertCntrl: AlertController, private toastCtrl: ToastController, private actionShettCntrl: ActionSheetController) {
    if (localStorage.getItem("taskList") != null) {
      this.taskList = JSON.parse(localStorage.getItem("taskList"));
    }


  }

  async showAdd() {
    const alertCreate = await this.alertCntrl.create({
      cssClass: 'my-custom-class',
      header: 'O que deseja adicionar?!',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'O Que deseja adicionar?'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            close();

          }
        }, {
          text: 'Adicionar',
          handler: (form) => {
            this.addTask(form.newTask);


          }
        }
      ]
    })
    await alertCreate.present();



  }

  async addTask(newTask: string) {
    if (newTask == "" || newTask == null) {
      const toast = await this.toastCtrl.create({
        message: "Informe o que deseja fazer!",
        duration: 2000,
        position: "top",
        color: "danger",


      })

      toast.present();
    }

    var task = { name: newTask, done: false };

    this.taskList.push(task);
    this.updateLocalStorage();

    // if(task.done)

  }

  updateLocalStorage() {

    localStorage.setItem("taskList", JSON.stringify(this.taskList));

  }

  async openActions(task: any) {
    var actionSheet = await this.actionShettCntrl.create({
      header: "O que deseja fazer?",
      
      buttons: [
        {
          text: task.done ? 'Desmarcar' : 'Marcar',
          icon: task.done ? 'radio-button-off' : 'radio-button-on',
          handler: () => {
            
            task.done = !task.done;

            this.updateLocalStorage();
          }
        },
        {
          text:"Editar",
          icon:"create",
          handler:async()=>{
            const alertEdit = await this.alertCntrl.create({
              cssClass: 'my-custom-class',
              header: 'Editar Tarefa',
              inputs: [
                {
                  name: 'newTask',
                  type: 'text',
                  placeholder: 'Tarefa',
                  value:task.name
                },
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    close();
        
                  }
                }, {
                  text: 'Editar',
                  handler: (form) => {
                    task.name=form.newTask;
                    this.updateLocalStorage();
        
        
                  }
                }
              ]
            })
            alertEdit.present();
          }
          
        },
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
        }
      ]

    });

    await (await actionSheet).present();
  }

  async deleteTask(task: any) {
    this.taskList = this.taskList.filter(x=> task != x);
    

    this.updateLocalStorage();
  }

  async editTask(task){
  
  }



}
