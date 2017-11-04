import { Component } from "@angular/core";
import { NavController, NavParams, MenuController } from "ionic-angular";

import { TarefaPage } from "../tarefa/tarefa";

import { TarefasService } from "../../providers/tarefas-service/tarefas-service";
import { ProjetosService } from "../../providers/projetos-service/projetos-service";

import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-buscar",
  templateUrl: "buscar.html"
})
export class BuscarPage {
  tarefas: any[];
  projetos: any[];
  filtroTarefas = {};

  public base64Image: string;

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public tarefasService: TarefasService,
    public projetosService: ProjetosService
  ) {
    this.projetos = projetosService.getProjetos();
    this.tarefas = tarefasService.getTarefas();
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.log(err);
      }
    );
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
