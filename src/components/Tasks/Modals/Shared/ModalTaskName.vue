<template>
	<div class="row q-mb-sm">
		<q-input
			clearable
			outlined
			autofocus
			v-select-all
			:value="name"
         @input="$emit('update:name', $event)"
			label="Task Name"
			class="col"
			:rules="[val => !!val || 'Field is required']"
			ref="taskName"
		/>
	</div>
</template>

<script>
import {selectAll} from "src/directives/directive-select-all"

export default {
	props: ["name"],
	
	directives: {
		selectAll
	}
};
</script>

<style lang="scss" scoped>
</style>