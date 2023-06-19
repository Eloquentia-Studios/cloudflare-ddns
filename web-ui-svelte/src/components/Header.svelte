<script lang="ts">
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import { onDestroy } from 'svelte'
  import trpc from '../services/trpc'
  import Logo from './Logo.svelte'

  dayjs.extend(relativeTime)

  let interval: NodeJS.Timeout | undefined
  const ip = trpc.getPublicIP.query()
  let displayTimeOfIPChange = '...'
  trpc.getTimeOfLastIPChange.query().then((timeOfIPChange) => {
    const update = () => (displayTimeOfIPChange = dayjs(timeOfIPChange).fromNow())
    interval = setInterval(update, 15 * 1000)
    update()
  })

  onDestroy(() => clearInterval(interval))
</script>

<div class="container">
  <a href="/"><Logo /></a>
  <div>
    <p>Welcome!</p>
    <p>{#await ip}<i>...</i>{:then ip}{ip}{/await}</p>
    <p>{displayTimeOfIPChange}</p>
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
