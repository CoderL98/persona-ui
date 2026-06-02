import { writable, type Writable } from 'svelte/store';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export type ToastInput = {
  /** Toast message body */
  message: string;
  /** Optional title */
  title?: string;
  /** Semantic tone */
  tone?: ToastTone;
  /** Auto-dismiss duration in ms; 0 disables auto-dismiss (default 5000) */
  duration?: number;
  /** Allow manual dismiss (default true) */
  dismissible?: boolean;
};

export type ToastRecord = Required<Omit<ToastInput, 'title'>> & {
  id: string;
  title?: string;
};

/** 内部 store —— 由 ToastProvider 订阅，外部可通过 toast() 命令式 push。 */
export const toasts: Writable<ToastRecord[]> = writable([]);

let counter = 0;
function genId() {
  counter += 1;
  return `pui-toast-${Date.now().toString(36)}-${counter}`;
}

/**
 * 命令式 API：toast.success('Saved!') / toast.error('Failed') / toast(message)
 * 返回 dismiss 函数，可在需要时手动关闭。
 */
export const toast = {
  show(input: ToastInput | string) {
    const opts: ToastInput = typeof input === 'string' ? { message: input } : input;
    const id = genId();
    const record: ToastRecord = {
      id,
      message: opts.message,
      title: opts.title,
      tone: opts.tone ?? 'info',
      duration: opts.duration ?? 5000,
      dismissible: opts.dismissible ?? true,
    };
    toasts.update((list) => [...list, record]);
    return () => dismiss(id);
  },
  success(message: string, opts: Omit<ToastInput, 'message' | 'tone'> = {}) {
    return toast.show({ ...opts, message, tone: 'success' });
  },
  error(message: string, opts: Omit<ToastInput, 'message' | 'tone'> = {}) {
    return toast.show({ ...opts, message, tone: 'error' });
  },
  warning(message: string, opts: Omit<ToastInput, 'message' | 'tone'> = {}) {
    return toast.show({ ...opts, message, tone: 'warning' });
  },
  info(message: string, opts: Omit<ToastInput, 'message' | 'tone'> = {}) {
    return toast.show({ ...opts, message, tone: 'info' });
  },
};

export function dismiss(id: string) {
  toasts.update((list) => list.filter((t) => t.id !== id));
}

export function clearToasts() {
  toasts.set([]);
}
