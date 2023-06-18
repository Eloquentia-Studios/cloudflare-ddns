<script lang="ts">
  import ZoneItem from './ZoneItem.svelte'
</script>

<div class="container">
  {#each Array(51) as z}
    <ZoneItem />
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 1rem;
    width: 100%;
  }
</style>
