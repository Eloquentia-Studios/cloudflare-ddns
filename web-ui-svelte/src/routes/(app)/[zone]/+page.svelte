<script lang="ts">
  import { page } from '$app/stores'
  import RecordList from '../../../components/RecordList.svelte'

  const zoneId = $page.params.zone
</script>

<h2>Records</h2>
<RecordList {zoneId} />

<style>
  h2 {
    margin-bottom: 1rem;
  }
</style>
