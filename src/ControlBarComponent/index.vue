<template>
    <div>
        <div class="display-bar">
            <span class="timer">{{ formattedTime }}</span>
            <span class="play">&#9654;</span>
            <span class="stop">&#9209;</span>
        </div>
        <div class="mode-bar">
            <button @click="startTicking(25)">Session</button>
            <button @click="startTicking(5)">Short Break</button>
            <button @click="startTicking(10)">Long Break</button>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
