<template>
    <div>
        <button
            @click="toggleVisibility"
            :class="{ active: visible, warning: !notificationIsEnabled() }"
        >
            Settings
        </button>
        <ul class="popup" :class="{ visible }">
            <li v-if="!notificationIsEnabled()">
                Notifications are not enabled for this site.
                <button @click="askNotification">Enable notifications</button>
            </li>
            <li v-else>Notifications are enabled.</li>
            <li>
                Pure view shortcut: <b>{{ globalData.pureViewShortcut }}</b>
            </li>
        </ul>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
