<script lang="ts">
  import { goto } from '$app/navigation'
  import Button from '../../../components/Button.svelte'
  import Input from '../../../components/Input.svelte'
  import { login } from '../../../services/authentication'

  let password: string = ''
  const onSubmit = async () => {
    if (await login(password)) goto('/')
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
