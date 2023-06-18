<script lang="ts">
  import Button from '../../components/Button.svelte'
  import Input from '../../components/Input.svelte'

  let password: string = ''
  const onSubmit = () => console.log(password)
</script>

<div class="form">
  <Input label="Password" bind:value={password} {onSubmit} />
  <Button on:click={onSubmit}>Sign in</Button>
</div>

<style>
  .form {
    max-width: 20rem;
    margin: 3rem auto 0 auto;
  }
</style>
