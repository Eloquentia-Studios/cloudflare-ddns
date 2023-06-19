<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import RecordList from '../../components/RecordList.svelte'
  import { checkAuthentication } from '../../services/authentication'

  // Check if client is already authenticated.
  onMount(async () => {
    if (!(await checkAuthentication())) goto('/authentication')
  })

  const zoneId = $page.params.zone
</script>

<h2>Records</h2>
<RecordList {zoneId} />

<style>
  h2 {
    margin-bottom: 1rem;
  }
</style>
