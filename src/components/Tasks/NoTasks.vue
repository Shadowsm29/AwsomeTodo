<template>
	<transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
		<q-banner dense class="bg-grey-3">
			<template v-slot:avatar>
				<q-icon name="check" color="primary" />
			</template>
			No tasks to do
			<template v-slot:action>
				<q-btn flat color="primary" label="Add Task" @click="$root.$emit('show-add-task')" />
			</template>
		</q-banner>
	</transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>