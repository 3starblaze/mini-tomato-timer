<template>
    <div>
        <button @click="toggleVisibility">Settings</button>
        <ul class="popup" :class="{ visible }">
            <li>Settings Option #1</li>
            <li>Settings Option #2</li>
            <li>Settings Option #3</li>
        </ul>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
