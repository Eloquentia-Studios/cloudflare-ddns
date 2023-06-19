<script>
  import Header from '../components/Header.svelte'
  import './styles.css'
  export const ssr = false

  import { SvelteToast } from '@zerodevx/svelte-toast'

  const options = {}
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

<SvelteToast {options} />

<style>
  :root {
    --toastBackground: #123456;
    --toastColor: #ffffff;
    --toastContainerBottom: 1rem;
    --toastContainerLeft: auto;
    --toastContainerRight: 1rem;
    --toastContainerTop: auto;
  }

  main {
    padding: 1rem;
    max-width: 80rem;
    margin: 0 auto;
  }
</style>
