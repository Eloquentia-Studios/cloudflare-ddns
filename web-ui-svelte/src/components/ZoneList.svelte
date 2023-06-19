<script lang="ts">
  import { ScaleOut } from 'svelte-loading-spinners'
  import trpc from '../services/trpc'
  import ZoneItem from './ZoneItem.svelte'

  const zones = trpc.getZones.query()
</script>

{#await zones}
  <div class="center"><ScaleOut /></div>
{:then zones}
  <div class="container">
    {#each zones as zone}
      <ZoneItem {zone} />
    {/each}
  </div>
{/await}

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 1rem;
    width: 100%;
  }
</style>
