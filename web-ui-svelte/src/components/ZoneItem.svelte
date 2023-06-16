<div class="container">
  <p id="id">098rfs7438789879877983879xxxxxxx</p>
  <p id="name">example.com</p>
  <p id="records">15 record(s)</p>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05);
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
</style>
