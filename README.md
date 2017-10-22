# Projeto 1 (Atividade aberta 5)

- Uma nova página, que deve ser inserida na navegação por abas (3ª aba);
- Uma nova funcionalidade, por meio de um componente Ionic que ainda não tenha sido usado no exemplo.

Primeiramente criamos uma nova página Buscar para exibir a lista de tarefas buscáveis por descrição (nova funcionalidade).

Para isso usamos o comando:
```
  ionic –g page Buscar
```

Reaproveitamos a lista já construída para página Tarefas e adicionamos o componente SearchBar, assim temos a página Tarefas sobrecarregada com uma SearchBar.

Adicionamos um novo item no menu da página tarefas para redicionar para a nova página Buscar:
```
<ion-content>
  <ion-list>
    <ion-item-group>
      <button ion-item (click)="filtroBuscar()">Buscar</button>
      <button ion-item (click)="limpaFiltros()">Todas</button>
      <button ion-item (click)="filtroDias(0)">Até hoje</button>
      <button ion-item (click)="filtroDias(1)">Até amanhã</button>
      <button ion-item (click)="filtroDias(7)">Até a próxima semana</button>
    </ion-item-group>
    <ion-item-group>
      <ion-item-divider class="light">POR PROJETO</ion-item-divider>
      <button ion-item *ngFor="let p of projetos" (click)="filtroProjeto(p.codigo)">{{p.nome}}</button>
    </ion-item-group>
  </ion-list>
</ion-content>
```

Dentro da página Buscar adicionamos o novo componente SearchBar:
```
  <ion-searchbar placeholder="Tarefa..." (ionInput)="onInputTime($event)"></ion-searchbar>
```

E criamos o método *onInputTime* que é executado a cada entrada dentro da classe Buscar:
```
  onInputTime(ev: any) {
    let val = ev.target.value;
    this.filtroTarefas = { descricao: val };
  }
```

Esse método basicamente recebe o evento de entrada do SearchBar (a cada entrada de caracter) e recebe o seu valor que é o texto digitado pelo usuário. Esse texto é a descrição, então reutilizamos a variável *filtroTarefas* do componente Tarefas.

Dado esse novo filtro, tivemos que adicionar uma nova condicional ao pipe do componente Tarefas. De início a busca funcionava se os caracteres fossem totalmente iguais, logo depois alteramos para que fosse retornado a lista filtrada por substring:
```
  @Pipe({
    name: "filtro"
  })
  export class Filtro implements PipeTransform {
    transform(itens: any[], filtro: any): any {
      itens.sort((a, b) => a.data - b.data);
      **if (filtro.descricao) {
        return itens.filter(item => item.descricao == filtro.descricao); **
      } else if (filtro.projeto >= 0) {
        return itens.filter(item => item.projeto == filtro.projeto);
      } else if (filtro.dias >= 0) {
        let d = new Date(
          new Date().getTime() + filtro.dias * 24 * 60 * 60 * 1000
        );
        return itens.filter(item => item.data <= d);
      } else return itens;
    }
  }
```

Para isso alteramos a condicional dentro da Pipe:
```
  @Pipe({
    name: "filtro"
  })
  export class Filtro implements PipeTransform {
    transform(itens: any[], filtro: any): any {
      itens.sort((a, b) => a.data - b.data);
      **if (filtro.descricao) {
        return itens.filter(item => item.descricao.indexOf(filtro.descricao) > -1); **
      } else if (filtro.projeto >= 0) {
        return itens.filter(item => item.projeto == filtro.projeto);
      } else if (filtro.dias >= 0) {
        let d = new Date(
          new Date().getTime() + filtro.dias * 24 * 60 * 60 * 1000
        );
        return itens.filter(item => item.data <= d);
      } else return itens;
    }
  }
```
