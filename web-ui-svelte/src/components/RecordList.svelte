<script lang="ts">
  import { ScaleOut } from 'svelte-loading-spinners'
  import trpc from '../services/trpc'
  import RecordItem from './RecordItem.svelte'

  export let zoneId: string
  const records = trpc.getRecords.query(zoneId)
</script>

<div class="container">
  {#await records}
    <div class="center"><ScaleOut /></div>
  {:then records}
    {#each records as record}
      <RecordItem {record} />
    {/each}
  {/await}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    width: 100%;
  }
</style>
