import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { TarefasService } from "../../providers/tarefas-service/tarefas-service";
import { ProjetosService } from "../../providers/projetos-service/projetos-service";
import { TabsPage } from "../tabs/tabs";

import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-tarefa",
  templateUrl: "tarefa.html"
})
export class TarefaPage {

  rootPage = TabsPage;

  projetos: any[];
  novo: boolean;

  codigoTarefa: number;
  codigoProjeto: number;
  descricao: string;
  prioridade: number;
  data: string;
  public img: string;

  constructor(
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public tarefasService: TarefasService,
    public projetosService: ProjetosService
  ) {

    this.projetos = projetosService.getProjetos();
    this.codigoTarefa = navParams.get("codigo");
    this.novo = navParams.get("novo");

    if (!this.novo) {
      let tarefas = tarefasService.getTarefas();
      for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].codigo == this.codigoTarefa) {
          this.codigoProjeto = tarefas[i].projeto;
          this.descricao = tarefas[i].descricao;
          this.prioridade = tarefas[i].prioridade;
          this.img = tarefas[i].img;
          let d = tarefas[i].data;
          this.data =
            d.getFullYear() +
            "-" +
            ("0" + (d.getMonth() + 1)).substr(-2, 2) +
            "-" +
            ("0" + d.getDate()).substr(-2, 2);
        }
      }
    } else {
      this.codigoProjeto = this.projetos[0].codigo;
      this.descricao = "";
      this.prioridade = 3;
      let d = new Date();
      this.data =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).substr(-2, 2) +
        "-" +
        ("0" + d.getDate()).substr(-2, 2);
    }
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
        this.img = "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.log(err);
      }
    );
  }

  alterar() {
    let d = new Date(
      parseInt(this.data.substr(0, 4)),
      parseInt(this.data.substr(5, 2)),
      parseInt(this.data.substr(8, 2))
    );
    this.tarefasService.editTarefa(
      this.codigoTarefa,
      this.codigoProjeto,
      this.descricao,
      d,
      this.prioridade,
      this.img,
    );
    this.navCtrl.pop();
  }

  excluir() {
    this.tarefasService.deleteTarefa(this.codigoTarefa);
    this.navCtrl.pop();
  }

  incluir() {
    let d = new Date(
      parseInt(this.data.substr(0, 4)),
      parseInt(this.data.substr(5, 2)),
      parseInt(this.data.substr(8, 2))
    );
    this.tarefasService.addTarefa(
      this.codigoProjeto,
      this.descricao,
      d,
      this.prioridade,
      this.img
    );
    this.navCtrl.pop();
  }
}
