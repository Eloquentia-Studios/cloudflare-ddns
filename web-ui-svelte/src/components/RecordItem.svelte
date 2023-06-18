<script lang="ts">
  import Checkbox from './Checkbox.svelte'

  let record: {
    id: string
    name: string
    type: string
    content: string
    proxied: boolean
    ttl: number
    locked: boolean
    comment: any
    created_on: string
    modified_on: string
  } = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: 'tunnel.example.com',
    type: 'A',
    content: '157.89.74.87',
    proxied: Math.random() > 0.3,
    ttl: 120,
    locked: Math.random() > 0.8,
    comment: null,
    created_on: '2021-08-01T00:00:00.000000Z',
    modified_on: '2021-08-01T00:00:00.000000Z'
  }
</script>

<div class="container">
  <div>
    <span class="type">{record.type}</span>
  </div>

  <div>
    <p id="name">{record.name}</p>
    <p id="content">{record.content}</p>
  </div>

  <div>
    <p id="proxy">{record.proxied ? 'Proxied' : 'DNS only'}</p>
    <p id="ttl">TTL {record.ttl / 60} min</p>
  </div>

  <div class="toggle">
    <Checkbox disabled={record.locked} checked={Math.random() > 0.8 && !record.locked} />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr 2rem;
    gap: 1rem;
    width: 100%;

    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05);
    border-radius: 0.25rem;
    padding: 1rem;

    transition: box-shadow 0.2s ease-in-out;
  }

  .container:hover {
    box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  .container > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .type {
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 0.8rem;
  }

  #content,
  #ttl {
    font-size: 0.7rem;
    font-weight: 600;
  }

  #name,
  #proxy {
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    .container {
      display: grid;
      grid-template-columns: 1.5rem 1fr 1fr 2rem;
    }

    .type {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.5rem;
    }

    #content,
    #ttl {
      font-size: 0.5rem;
      font-weight: 600;
    }

    #name,
    #proxy {
      font-size: 0.8rem;
    }
  }
</style>
