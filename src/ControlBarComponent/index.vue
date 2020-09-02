<template>
    <div>
        <div class="display-bar">
            <span class="timer pure-item">{{ formattedTime }}</span>
            <button class="play" @click="play">
                <PlayButton></PlayButton>
            </button>
            <button class="stop" @click="stop">
                <StopButton></StopButton>
            </button>
        </div>
        <div class="mode-bar">
            <button id="session-button"
                    @click="switchTimerMode('session')"
                    :class="{ active: activeButton === 'session' }"
            >Session</button>
            <button id="short-break-button"
                    @click="switchTimerMode('shortBreak')"
                    :class="{ active: activeButton === 'shortBreak' }"
            >Short Break</button>
            <button id="long-break-button"
                    @click="switchTimerMode('longBreak')"
                    :class="{ active: activeButton === 'longBreak' }"
            >Long Break</button>
        </div>
    </div>
</template>

<script src="./script.ts"></script>
<style src="./style.scss" lang="scss" scoped></style>
