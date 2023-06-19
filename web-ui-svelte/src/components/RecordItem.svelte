<script lang="ts">
  import { setErrorToast, setSuccessToast, showLoadingToast } from '../services/toast'
  import type { RouterOutput } from '../services/trpc'
  import trpc from '../services/trpc'
  import Checkbox from './Checkbox.svelte'

  export let record: RouterOutput['getRecords'][number]

  let ddnsDisabled = record.locked || !['A', 'AAAA'].includes(record.type)
  let ddnsStatus = record.ddnsStatus
  const toggleDDNSStatus = async () => {
    if (ddnsDisabled) return

    const id = showLoadingToast('Updating DDNS status...')
    ddnsDisabled = true
    trpc.updateRecordDDNSStatus
      .mutate({ zoneId: record.zone_id, recordId: record.id, ddnsStatus: !ddnsStatus })
      .then(() => {
        ddnsStatus = !ddnsStatus
        setSuccessToast(id, 'DDNS status updated!')
      })
      .catch(() => setErrorToast(id, 'Failed to update DDNS status!'))
      .finally(() => (ddnsDisabled = false))
  }

  const rewriteRecordType = (type: string) => {
    switch (type) {
      case 'CNAME':
        return 'CN'
      case 'DNSKEY':
        return 'DKEY'
      case 'HTTPS':
        return 'SSL'
      case 'NAPTR':
        return 'NAP'
      case 'SMIMEA':
        return 'SMI'
      case 'SSHFP':
        return 'SSH'
      default:
        return type
    }
  }
</script>

<div class="container">
  <div>
    <span class="type">{rewriteRecordType(record.type)}</span>
  </div>

  <div>
    <p id="name">{record.name}</p>
    <p id="content">{record.content}</p>
  </div>

  <div>
    <p id="proxy">{record.proxied ? 'Proxied' : 'DNS only'}</p>
    <p id="ttl">TTL {record.ttl === 1 ? `Auto` : `${record.ttl / 60} min`}</p>
  </div>

  <div class="toggle">
    <Checkbox disabled={ddnsDisabled} bind:checked={ddnsStatus} on:click={toggleDDNSStatus} />
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
    width: 2.1rem;
    height: 2.1rem;
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
