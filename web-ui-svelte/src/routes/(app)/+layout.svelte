<script>
  import { goto } from '$app/navigation'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { onMount } from 'svelte'
  import { ScaleOut } from 'svelte-loading-spinners'
  import Header from '../../components/Header.svelte'
  import { checkAuthentication } from '../../services/authentication'
  export const ssr = false

  let authenticating = true
  onMount(async () => {
    if (!(await checkAuthentication())) goto('/authentication')
    else authenticating = false
  })
</script>

{#if authenticating}
  <div class="center"><ScaleOut /></div>
{:else}
  <div class="app">
    <Header />
    <main>
      <slot />
    </main>
  </div>
{/if}

<SvelteToast />

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
