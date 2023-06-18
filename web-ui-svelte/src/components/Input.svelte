<script lang="ts">
  const id: string = Math.random().toString(36).substring(2, 9)
  export let label: string
  export let value: string
  export let placeholder: string = ''

  export let onSubmit: (value: string) => void = () => {}
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSubmit(value)
    }
  }
</script>

<div class="control">
  <label class="label" for={id}>{label}</label>
  <input class="input" {id} bind:value {placeholder} on:keyup={onKeyUp} />
</div>

<style>
  .control {
    margin-bottom: 1rem;
  }

  .label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .input {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #555;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dbdbdb;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .input:focus {
    border-color: #3273dc;
    outline: 0;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }
</style>
