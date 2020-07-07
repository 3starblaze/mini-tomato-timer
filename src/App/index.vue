<template>
    <div id="main">
        <div class="display-bar">
            <span class="timer">{{ formattedTime }}</span>
            <span class="play">&#9654;</span>
            <span class="stop">&#9209;</span>
        </div>
        <div class="mode-bar">
            <span @click="startTicking(25)">Session</span>
            <span @click="startTicking(5)">Short Break</span>
            <span @click="startTicking(10)">Long Break</span>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
