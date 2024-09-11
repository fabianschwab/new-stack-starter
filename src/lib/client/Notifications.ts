import { persisted } from 'svelte-persisted-store';

export const notifications = persisted<{ id: string; data: Notification }[]>('notifications', []);

export const addNotification = (notification: Notification) => {
	if (notification.hideCloseButton && !notification.timeout) {
		throw new Error('If you hide the close button, you need to set a timeout.');
	}

	const id = self.crypto.randomUUID();

	// Push the notification to the top of the list of notifications
	notifications.update((all) => [{ id, data: notification }, ...all]);

	// If notification is dismissible, dismiss it after "timeout" amount of time.
	if (notification.timeout) setTimeout(() => dismissNotification(id), notification.timeout);
};

export const dismissNotification = (id: string) => {
	notifications.update((all) => all.filter((n) => n.id !== id));
};

export const clearNotifications = () => {
	notifications.set([]);
};

export type Notification = {
	type: NotificationType;
	timeout?: number;
	title: string;
	caption?: string;
	hideCloseButton?: boolean;
};

export enum NotificationType {
	Error = 'error',
	Info = 'info',
	Success = 'success',
	Warning = 'warning'
}
