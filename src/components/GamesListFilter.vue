<template>
  <section class="grid grid-cols-2 gap-2 items-center">
    <label for="gamesListSortBy">Sort By:</label>
    <select name="gamesListSortBy"
            id="gamesListSortBy"
            class="p-2 rounded-md dark:bg-zinc-900"
            :value="sortBy"
            @change="event => $emit('sortBy:updated', event.target.value)"
    >
      <option value="popular">Popularity</option>
      <option value="uploaddate">Recently Uploaded</option>
      <option value="title">Alphabetically</option>
    </select>
    <label for="gamesListSortDir">Sort direction:</label>
    <select name="gamesListSortDir"
            id="gamesListSortDir"
            class="p-2 rounded-md dark:bg-zinc-900"
            :value="sortDir"
            @change="event => $emit('sortDir:updated', event.target.value)"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </section>
</template>

<script>
export default {
  props: {
    sortBy: {
      type: String,
      required: true
    },
    sortDir: {
      type: String,
      required: true
    }
  }
}
</script>
