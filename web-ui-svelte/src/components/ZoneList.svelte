<script lang="ts">
  import trpc from '../services/trpc'
  import ZoneItem from './ZoneItem.svelte'

  const zones = trpc.getZones.query()
</script>

<div class="container">
  {#await zones}
    <i>Loading...</i>
  {:then zones}
    {#each zones as zone}
      <ZoneItem {zone} />
    {/each}
  {/await}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 1rem;
    width: 100%;
  }
</style>
