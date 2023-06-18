<script lang="ts">
  import { onMount } from 'svelte'
  import Button from '../../components/Button.svelte'
  import Input from '../../components/Input.svelte'
  import { checkAuthentication, login } from '../../services/authentication'

  // Check if client is already authenticated.
  onMount(async () => {
    if (await checkAuthentication()) window.location.href = '/'
  })

  // Submit login form.
  let password: string = ''
  const onSubmit = async () => {
    if (await login(password)) window.location.href = '/'
  }
</script>

<div class="form">
  <Input type="password" label="Password" bind:value={password} {onSubmit} />
  <Button on:click={onSubmit}>Sign in</Button>
</div>

<style>
  .form {
    max-width: 20rem;
    margin: 3rem auto 0 auto;
  }
</style>
