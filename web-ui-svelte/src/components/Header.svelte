<script>
  import Logo from './Logo.svelte'
</script>

<div class="container">
  <a href="/"><Logo /></a>
  <div>
    <p>Status: Good</p>
    <p>157.84.89.148</p>
    <p>5 days ago</p>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0.5rem;
    gap: 1rem;

    background-color: #fff;
    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05);
  }

  .container > a {
    height: 100%;
    width: 13rem;
  }

  .container > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    height: 100%;
  }

  .container > div > p {
    font-size: 0.8rem;
  }
</style>
