// Angular Dependencies
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";

import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";

import { MyApp } from "./app.component";

// Pages
import { ProjetosPage } from "../pages/projetos/projetos";
import { ProjetoPage } from "../pages/projeto/projeto";
import { TarefasPage, Filtro } from "../pages/tarefas/tarefas";
import { TarefaPage } from "../pages/tarefa/tarefa";
import { TabsPage } from "../pages/tabs/tabs";
import { BuscarPage } from "../pages/buscar/buscar";

// Ionic Native Dependencies
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { ProjetosService } from "../providers/projetos-service/projetos-service";
import { TarefasService } from "../providers/tarefas-service/tarefas-service";

import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    ProjetosPage,
    ProjetoPage,
    TabsPage,
    TarefasPage,
    TarefaPage,
    BuscarPage,
    Filtro
  ],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjetosPage,
    ProjetoPage,
    TarefasPage,
    TarefaPage,
    BuscarPage,
    TabsPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    ProjetosService,
    TarefasService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
