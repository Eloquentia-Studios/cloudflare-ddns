<script>
  import Header from '../components/Header.svelte'
  import './styles.css'
</script>

<svelte:head>
  <title>Cloudflare DDNS</title>
  <meta name="description" content="Cloudflare DDNS configuration Web UI" />
</svelte:head>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
  main {
    padding: 1rem;
    max-width: 80rem;
    margin: 0 auto;
  }
</style>
