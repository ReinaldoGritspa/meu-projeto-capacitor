<script>
  import Header from '$lib/components/Header.svelte';
  import SideBar from '$lib/components/SideBar.svelte';
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import * as bootstrap from 'bootstrap';

  let { children } = $props();
</script>

<Header />

<div class="container-fluid py-5 mt-4 mb-5">
  {@render children()}
</div>

<footer class="navbar bg-light border-top fixed-bottom shadow-sm">
  <div class="container-fluid d-flex justify-content-center align-items-center py-2">
    <span class="text-muted fs-5">👑</span>
  </div>
</footer>

<SideBar />
