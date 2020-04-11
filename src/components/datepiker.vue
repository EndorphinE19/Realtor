<template>
    <b-datepicker
        placeholder="Type or select a date..."
        icon="calendar-today"
        editable
        v-model="dateFilter"
        @input="keysSwitch('date')"
        v-on:input="toAndFromDate(dateFilter)"
        :key="1">
    </b-datepicker>
</template>