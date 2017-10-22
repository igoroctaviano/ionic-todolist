import { Component, Pipe, PipeTransform } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";

import { TarefaPage } from "../tarefa/tarefa";

import { TarefasService } from "../../providers/tarefas-service/tarefas-service";
import { ProjetosService } from "../../providers/projetos-service/projetos-service";

@Component({
  selector: "page-buscar",
  templateUrl: "buscar.html"
})
export class BuscarPage {
  tarefas: any[];
  projetos: any[];
  filtroTarefas = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public tarefasService: TarefasService,
    public projetosService: ProjetosService
  ) {
    this.projetos = projetosService.getProjetos();
    this.tarefas = tarefasService.getTarefas();
  }

  nomeProjeto(c): string {
    for (let i = 0; i < this.projetos.length; i++)
      if (this.projetos[i].codigo == c) return this.projetos[i].nome;
    return "Projeto não encontrado";
  }

  selecionaTarefa(c) {
    let t: number = parseInt(c);
    this.navCtrl.push(TarefaPage, { codigo: t, novo: false });
  }

  novaTarefa() {
    this.navCtrl.push(TarefaPage, { codigo: 0, novo: true });
  }

  limpaFiltros() {
    this.filtroTarefas = {};
    this.menuCtrl.close();
  }

  filtroProjeto(c) {
    this.filtroTarefas = { projeto: c };
    this.menuCtrl.close();
  }

  filtroDias(d) {
    this.filtroTarefas = { dias: d };
    this.menuCtrl.close();
  }

  onInputTime(ev: any) {
    let val = ev.target.value;
    this.filtroTarefas = { descricao: val };
  }
}
