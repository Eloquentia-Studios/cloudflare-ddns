<button on:click><slot /></button>

<style>
  button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #fff;
    background-color: #3273dc;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }

  button:hover {
    background-color: #2767d8;
    border-color: #2767d8;
  }

  button:focus {
    outline: 0;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }
</style>
