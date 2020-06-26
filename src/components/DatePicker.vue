<template>
    <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
    >

        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="date"
                    :label="label"
                    :outlined="outlined"
                    readonly
                    v-on="on"
                    :rules="rules"
            ></v-text-field>
        </template>

        <v-date-picker v-model="date" scrollable ref="picker" @change="save">
        </v-date-picker>
    </v-dialog>
</template>

<script>
    export default {
        name: "DatePicker",

        props: {
            label: {
                default: "label",
                type: String
            },
            outlined: {
                default: false,
                type: Boolean
            },
            value: {
                default: null,
            },
            rules: {
                default: () => ([]),
            }
        },
        data: () => ({
            date: null,
            modal: false,
        }),
        watch: {
            modal(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        mounted() {
            this.date = this.value
        },
        methods: {
            save: function (date) {
                this.$emit('input', date)
                this.$refs.dialog.save(date)
            },
        },
    }
</script>

<style scoped>

</style>