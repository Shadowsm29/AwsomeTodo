<template>
	<q-input bottom-slots outlined v-model="searchField" label="Label" class="col" v-select-all @keyup.esc="searchField = ''">
		<template v-slot:append>
			<q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
			<q-icon name="search" />
		</template>
	</q-input>
</template>

<script>
import {mapState} from "vuex"
import {mapActions} from "vuex"
import {selectAll} from "src/directives/directive-select-all"

export default {
   computed: {
      ...mapState("tasks", ["search"]),
      searchField: {
         get() {
            return this.search;
         },
         set(value) {
            this.setSearch(value);
         }
      }
   },

   methods: {
      ...mapActions("tasks", ["setSearch"])
   },

   directives: {
		selectAll
	}
};
</script>

<style lang="scss" scoped>
</style>