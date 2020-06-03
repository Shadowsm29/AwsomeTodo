<template>
	<q-select outlined v-model="sortBy" :options="options" label="Sort By" class="col q-ml-sm" emit-value map-options />
</template>

<script>
import {mapState} from "vuex"
import {mapActions} from "vuex"

export default {
	data() {
		return {
			options: [
				{
					label: "Name",
					value: "name"
				},
				{
					label: "Date",
					value: "dueDate"
				}
			]
		};
   },
   
   computed: {
      ...mapState("tasks", ["sort"]),
      sortBy: {
         get() {
            return this.sort;
         },
         set(value) {
            this.setSort(value);
         }
      }
   },

   methods: {
      ...mapActions("tasks", ["setSort"])
   }
};
</script>

<style lang="scss" scoped>
.q-select {
	flex: 0 0 112px;
	margin-top: -20px;
}
</style>