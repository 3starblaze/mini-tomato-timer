<template>
    <div>
        <button @click="toggleVisibility" :class="{ active: visible }">Settings</button>
        <ul class="popup" :class="{ visible }">
            <li v-if="notificationPermission !='granted'">
                Notifications are not enabled for this site.
                <button @click="askNotification">Enable notifications</button>
            </li>
            <li>
                Pure view shortcut: <b>{{ pureViewShortcut }}</b>
            </li>
        </ul>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
