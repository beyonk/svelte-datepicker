<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<span class="chevron" class:bottom={!up} on:click></span>
  
<script>
  export let up = true
</script>

<style>
  .chevron {
    margin-left: -16px;
  }
  
  .chevron::before {
    margin: 8px;
    border-style: solid;
    border-width: 0.4em 0.4em 0 0;
    content: '';
    display: inline-block;
    height: 0.75em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.75em;
  }
  
  .chevron.bottom:before {
    top: 0;
    transform: rotate(135deg);
  }
</style>