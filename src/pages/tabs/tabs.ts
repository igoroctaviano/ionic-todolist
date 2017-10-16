import { Component } from "@angular/core";

import { ProjetosPage } from "../projetos/projetos";
import { TarefasPage } from "../tarefas/tarefas";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  
  tab1Root: any = TarefasPage;
  tab2Root: any = ProjetosPage;

  constructor() {}
}
