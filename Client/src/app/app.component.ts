import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  nome:string = "";
  utenti:string[] = [];
  socket = io('http://localhost:3002');
  message$: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnInit(): void {
    this.socket.on('aggiorna', (arg) => {
      this.message$.next(arg);
    });
    this.message$.asObservable().subscribe((message) => {
      console.log(message);
      this.utenti = message.toString().split(',')
    });

  }

  constructor(private http:HttpClient){
    this.http.get("https://randomuser.me/api/").subscribe(
      res => {
        var x = res["results"][0]["name"];
        this.nome = x["title"] + " " + x["first"] + " " + x["last"];
        console.log(this.nome)
        this.socket.emit("aggiungi", this.nome);

      },
      err => {
        console.log(err);
      }
    );
  }

  clickDisconn(){
    console.log('disconnessione')
    this.socket.emit('discon', this.nome)
    this.socket.emit('disconnect', this.nome)
    window.close()
  }

  ngOnDestroy(): void {
    //NON VAAAAAAAAAAAA
    this.clickDisconn()
  }

  
}