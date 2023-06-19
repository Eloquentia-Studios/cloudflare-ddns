<script lang="ts">
  export let disabled: boolean = false
  export let checked: boolean = false

  const id = Math.random().toString(36).substring(2, 15)
</script>

<input type="checkbox" {id} {disabled} bind:checked />
<label for={id} on:click on:keydown />

<style>
  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
  }

  input[type='checkbox'] + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  input[type='checkbox'] + label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    outline: 1px solid #ccc;
  }

  input[type='checkbox']:hover + label:before {
    background: #f35429;
  }

  input[type='checkbox']:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  input[type='checkbox']:checked + label:before {
    background: #f35429;
    outline: none;
  }

  input[type='checkbox']:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  input[type='checkbox']:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  input[type='checkbox']:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
    transform: rotate(45deg);
  }
</style>
