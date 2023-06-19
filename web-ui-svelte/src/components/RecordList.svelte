<script lang="ts">
  import trpc from '../services/trpc'
  import RecordItem from './RecordItem.svelte'

  export let zoneId: string
  const records = trpc.getRecords.query(zoneId)
</script>

<div class="container">
  {#await records}
    <i>Loading...</i>
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
