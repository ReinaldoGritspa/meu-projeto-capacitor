<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import ToDoList from '$lib/components/ToDoList.svelte';
	import * as bootstrap from 'bootstrap';
	import { exists } from 'drizzle-orm';

	let novaTarefa = $state('');
	let tarefas = $state([]);
	let tarefasPendentes = $derived(tarefas.filter((tarefa) => tarefa.status == 0));
	let tarefasConcluidas = $derived(tarefas.filter((tarefa) => tarefa.status == 1));
	let conteudoTarefaEditando = $state('');
	let tarefaEditando = $state();
	let tarefaExcluindo;
	let mensagemToast;
	let exibir = $state('0');

	async function adicionarTarefa() {
	  novaTarefa = novaTarefa.trim();
	  if (!novaTarefa) {
		mensagemToast.show();
		return;
	  }
	  tarefas.push({ conteudo: novaTarefa, status: 0 });
	  novaTarefa = '';
	}
  
	function editarTarefa(tarefa) {
	  tarefaEditando = tarefa;
	  conteudoTarefaEditando = tarefa.conteudo;
	}
  
	function confirmarEdicao() {
	  if (!conteudoTarefaEditando) {
		mensagemToast.show();
		return;
	  }
	  tarefaEditando.conteudo = conteudoTarefaEditando;
	  tarefaEditando = null;
	  conteudoTarefaEditando = '';
	}
  
	function cancelarEdicao() {
	  tarefaEditando = undefined;
	}
  
	function excluirTarefa(tarefa) {
	  tarefaExcluindo = tarefa;
	}
  
	function confirmarExclusao() {
	  if (tarefaExcluindo) {
		tarefas = tarefas.filter((tarefa) => tarefa !== tarefaExcluindo);
		tarefaExcluindo = undefined;
	  }
	}
  
	function alterarStatus(tarefa, status) {
	  tarefa.status = status;
	}
  
	function tarefapronta() {
	  tarefas.forEach((tarefa) => {
		tarefa.status = 1;
	  });
	}
  
	function tarefanaopronta() {
	  tarefas.forEach((tarefa) => {
		tarefa.status = 0;
	  });
	}
  
	function buscarTarefas() {
	  return tarefas.filter(tarefa => tarefa.conteudo.toLowerCase().includes(busca.toLowerCase()));
	}
  
	onMount(() => {
	  mensagemToast = new bootstrap.Toast('#mensagemToast');
	});
</script>

<div class="fixed-top pt-5" style="z-index: 1020;">
	<form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
	  <input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
	  <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar">
		<i class="bi bi-plus-lg"></i>
	  </button>
	</form>
	<Toast msg={'Digite algo!'} />
</div>

<form>
	<div class="container-fluid mt-5 pt-4">
		Quais tarefas exibir?
		<select name="pets" id="pet-select" bind:value={exibir}>
			<option value="0">Pendentes</option>
			<option value="1">Concluídas</option>
		</select>

		<br />

		<br />

		{#if exibir == '0'}
			<ToDoList
				tarefas={tarefasPendentes}
				{tarefaEditando}
				bind:conteudoTarefaEditando
				{editarTarefa}
				{confirmarEdicao}
				{cancelarEdicao}
				{alterarStatus}
				{excluirTarefa}
			/>
		{:else if exibir == '1'}
			<ToDoList
				tarefas={tarefasConcluidas}
				{tarefaEditando}
				bind:conteudoTarefaEditando
				{editarTarefa}
				{confirmarEdicao}
				{cancelarEdicao}
				{alterarStatus}
				{excluirTarefa}
			/>
		{/if}

		<button type="button" class="btn btn-warning" onclick={alltasksdone}
			>Todas tarefas concluidas</button
		>
		<button type="button" class="btn btn-danger" onclick={alltasksundone}
			>Todas tarefas pendentes</button
		>
	</div>

	<Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />
</form>
