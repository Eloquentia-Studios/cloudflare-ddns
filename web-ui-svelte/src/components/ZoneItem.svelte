<script lang="ts">
  import type { RouterOutput } from '../services/trpc'

  export let zone: RouterOutput['getZones'][number]
</script>

<a class="container" href="./{zone.id}/">
  <div class="info">
    <p id="id">{zone.id}</p>
    <p id="name">{zone.name}</p>
    <p id="records">{zone.recordCount} record(s)</p>
  </div>
  <div class="arrow" />
</a>

<style>
  * {
    color: #222;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    padding: 1rem;
    cursor: pointer;

    transition: box-shadow 0.2s ease-in-out;
  }

  .container:hover {
    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  #id {
    font-size: 0.7rem;
    font-weight: 500;
  }

  #name {
    font-size: 1.2rem;
  }

  #records {
    font-size: 0.7rem;
  }

  .arrow {
    width: 0;
    height: 0;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;

    border-left: 0.5rem solid #eee;

    transition: border-left 0.2s ease-in-out;
  }

  .container:hover .arrow {
    border-left: 0.5rem solid #bbb;
  }
</style>
