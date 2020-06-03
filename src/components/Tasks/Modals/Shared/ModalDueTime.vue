<template>
	<div class="row q-mb-sm">
		<q-input outlined clearable :value="dueTime" label="Due Time" class="col" @input="$emit('update:due-time', $event)">
			<template v-slot:append>
				<q-icon name="access_time" class="cursor-pointer">
					<q-popup-proxy transition-show="scale" transition-hide="scale">
						<q-time :value="dueTime" @input="$emit('update:due-time', $event)"/>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>

<script>
export default {
   props: ["dueTime", "dueDate"]
};
</script>

<style lang="scss" scoped>
</style>