<template>
	<div class="row q-mb-sm">
		<q-input outlined clearable :value="dueDate" label="Due Date" @input="$emit('update:due-date', $event)">
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						<q-date :value="dueDate" @input="$emit('update:due-date', $event)" />
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>

<script>
export default {
	props: ["dueDate"]
};
</script>

<style lang="scss" scoped>
</style>