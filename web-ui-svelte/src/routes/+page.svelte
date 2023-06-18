<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import ZoneList from '../components/ZoneList.svelte'
  import { checkAuthentication } from '../services/authentication'

  // Check if client is already authenticated.
  onMount(async () => {
    if (!(await checkAuthentication())) goto('/authentication')
  })
</script>

<h2>Zones</h2>
<ZoneList />

<style>
  h2 {
    margin-bottom: 1rem;
  }
</style>
