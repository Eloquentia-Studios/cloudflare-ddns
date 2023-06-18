<script lang="ts">
  import RecordItem from './RecordItem.svelte'
</script>

<div class="container">
  {#each Array(16) as z}
    <RecordItem />
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    width: 100%;
  }
</style>
