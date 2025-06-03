<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import ToDoList from '$lib/components/ToDoList.svelte';
	import * as bootstrap from 'bootstrap';
  
	let novaTarefa = $state('');
	let tarefas = $state([]);
	let tarefasPendentes = $derived(tarefas.filter((tarefa) => tarefa.status == 0));
	let tarefasConcluidas = $derived(tarefas.filter((tarefa) => tarefa.status == 1));
	let conteudoTarefaEditando = $state('');
	let tarefaEditando = $state();
	let tarefaExcluindo;
	let mensagemToast;
	let exibir = $state('0');
	let busca = $state('');
  
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
  
  <style>
	body {
	  background-color: #fafafa;
	  color: #333;
	  font-family: 'Arial', sans-serif;
	  margin: 0;
	  padding: 0;
	}
  
	.container-fluid {
	  max-width: 800px;
	  margin: 0 auto;
	  padding: 20px;
	}
  
	input.form-control, select.form-control {
	  border-radius: 5px;
	  border: 1px solid #ccc;
	  background-color: #fff;
	  padding: 10px;
	  font-size: 16px;
	}
  
	.input-group-text {
	  background-color: #fff;
	  border: 1px solid #ccc;
	}
  
	.btn {
	  font-size: 16px;
	  padding: 10px 15px;
	  border-radius: 5px;
	  border: 1px solid #ccc;
	  background-color: #fff;
	  color: #333;
	}
  
	.btn-primary {
	  background-color: #333;
	  color: #fff;
	}
  
	.btn-primary:hover {
	  background-color: #555;
	}
  
	.task-item {
	  background-color: #fff;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  margin-bottom: 10px;
	  padding: 10px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
  
	.task-item:hover {
	  background-color: #f5f5f5;
	}
  
	h1, h2 {
	  font-weight: 600;
	  color: #333;
	}
  
	.task-list-container {
	  background-color: #fff;
	  padding: 20px;
	  border-radius: 10px;
	  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
  
	.toast {
	  background-color: #333;
	  color: #fff;
	}
  
	.dropdown-menu {
	  background-color: #fff;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	}
  </style>
  
  <div class="fixed-top pt-5" style="z-index: 1020;">
	<form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
	  <input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
	  <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar">
		<i class="bi bi-plus-lg"></i>
	  </button>
	</form>
	<Toast msg={'Digite algo!'} />
  </div>
  
  <div class="container-fluid mt-5 pt-4">
	<input
	  type="text"
	  class="form-control mb-3"
	  placeholder="Buscar tarefa"
	  bind:value={busca}
	/>
  
	<div class="d-flex justify-content-between mb-3">
  
	  <div class="dropdown">
		<button
		  class="btn btn-primary dropdown-toggle"
		  type="button"
		  id="dropdownStatus"
		  data-bs-toggle="dropdown"
		  aria-expanded="false"
		>
		  Exibir: {exibir == '0' ? 'Pendentes' : 'Concluídas'}
		</button>
		<ul class="dropdown-menu" aria-labelledby="dropdownStatus">
		  <li>
			<button class="dropdown-item" onclick={() => (exibir = '0')}>
			  Pendentes
			</button>
		  </li>
		  <li>
			<button class="dropdown-item" onclick={() => (exibir = '1')}>
			  Concluídas
			</button>
		  </li>
		</ul>
	  </div>
  
	  <div class="dropdown">
		<button
		  class="btn btn-primary dropdown-toggle"
		  type="button"
		  id="dropdownCounts"
		  data-bs-toggle="dropdown"
		  aria-expanded="false"
		>
		  Contagem
		</button>
		<ul class="dropdown-menu" aria-labelledby="dropdownCounts">
		  <li><span class="dropdown-item">Total: {tarefas.length}</span></li>
		  <li><span class="dropdown-item">Pendentes: {tarefasPendentes.length}</span></li>
		  <li><span class="dropdown-item">Concluídas: {tarefasConcluidas.length}</span></li>
		</ul>
	  </div>
	</div>
  
	<div class="task-list-container">
	  {#if exibir == '0'}
		<ToDoList
		  tarefas={buscarTarefas().filter((t) => t.status == 0)}
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
		  tarefas={buscarTarefas().filter((t) => t.status == 1)}
		  {tarefaEditando}
		  bind:conteudoTarefaEditando
		  {editarTarefa}
		  {confirmarEdicao}
		  {cancelarEdicao}
		  {alterarStatus}
		  {excluirTarefa}
		/>
	  {/if}
	</div>
  
	<div class="dropdown mt-4">
	  <button
		class="btn btn-primary dropdown-toggle"
		type="button"
		id="dropdownActions"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	  >
		Ações 
	  </button>
	  <ul class="dropdown-menu" aria-labelledby="dropdownActions">
		<li>
		  <button class="dropdown-item" onclick={tarefapronta}>
			Marcar todas como concluídas
		  </button>
		</li>
		<li>
		  <button class="dropdown-item" onclick={tarefanaopronta}>
			Marcar todas como pendentes
		  </button>
		</li>
	  </ul>
	</div>
  </div>
  
  <Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />
  