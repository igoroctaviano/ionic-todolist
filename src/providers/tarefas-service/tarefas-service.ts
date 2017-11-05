import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs/add/operator/map";

@Injectable()
export class TarefasService {
  
  tarefas = [
    {
      codigo: 1,
      projeto: 1,
      descricao: "Elaborar primeira prova",
      data: new Date(2017, 2, 29),
      prioridade: 1,
      img: ""
    },
    {
      codigo: 2,
      projeto: 1,
      descricao: "Fechar diário",
      data: new Date(2017, 5, 17),
      prioridade: 2,
      img: ""
    },
    {
      codigo: 3,
      projeto: 2,
      descricao: "Gravar vídeo de apresentação",
      data: new Date(2017, 2, 10),
      prioridade: 1,
      img: ""
    },
    {
      codigo: 4,
      projeto: 3,
      descricao: "Planejar campanha",
      data: new Date(2017, 3, 2),
      prioridade: 3,
      img: ""
    },
    {
      codigo: 5,
      projeto: 3,
      descricao: "Gravar videoaulas",
      data: new Date(2017, 2, 28),
      prioridade: 1,
      img: ""
    }
  ];
  ultimoCodigo = 5;

  constructor(public http: Http) {}

  getTarefas(): any[] {
    return this.tarefas;
  }

  editTarefa(c, prj, desc, dat, prior, img) {
    for (let i = 0; i < this.tarefas.length; i++) {
      if (this.tarefas[i].codigo == c) {
        this.tarefas[i].projeto = prj;
        this.tarefas[i].descricao = desc;
        this.tarefas[i].data = dat;
        this.tarefas[i].prioridade = prior;
        this.tarefas[i].img = img;
        break;
      }
    }
  }

  addTarefa(prj, desc, dat, prior, img) {
    this.ultimoCodigo++;
    this.tarefas.push({
      codigo: this.ultimoCodigo,
      projeto: prj,
      descricao: desc,
      data: dat,
      prioridade: prior,
      img: img
    });
  }

  deleteTarefa(c) {
    for (let i = 0; i < this.tarefas.length; i++) {
      if (this.tarefas[i].codigo == c) {
        this.tarefas.splice(i, 1);
        break;
      }
    }
  }
}
