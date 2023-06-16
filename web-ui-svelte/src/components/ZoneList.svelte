<script>
  import ZoneItem from './ZoneItem.svelte'
</script>

<div class="container">
  {#each Array(51) as z}
    <ZoneItem />
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
