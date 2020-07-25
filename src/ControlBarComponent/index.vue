<template>
    <div>
        <div class="display-bar">
            <span class="timer">{{ formattedTime }}</span>
            <button class="play" @click="play">
                <PlayButton></PlayButton>
            </button>
            <button class="stop" @click="stop">
                <StopButton></StopButton>
            </button>
        </div>
        <div class="mode-bar">
            <button id="session-button"
                    @click="sessionTick"
                    :class="{ active: activeButton === 'session' }"
            >Session</button>
            <button id="short-break-button"
                    @click="shortBreakTick"
                    :class="{ active: activeButton === 'shortBreak' }"
            >Short Break</button>
            <button id="long-break-button"
                    @click="longBreakTick"
                    :class="{ active: activeButton === 'longBreak' }"
            >Long Break</button>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
