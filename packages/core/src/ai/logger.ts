type LogLevel = 'info' | 'warn' | 'error'

type LogContext = {
  task?: string
  provider?: string
  model?: string
  durationMs?: number
  error?: string
}

function log(level: LogLevel, message: string, context: LogContext = {}) {
  const parts = [
    '[seo-builder:ai]',
    context.provider ? `provider=${context.provider}` : '',
    context.model ? `model=${context.model}` : '',
    context.task ? `task=${context.task}` : '',
    context.durationMs !== undefined ? `durationMs=${context.durationMs}` : '',
    message,
    context.error ? `error=${context.error}` : '',
  ].filter(Boolean)

  const line = parts.join(' ')

  if (level === 'error') {
    console.error(line)
  } else if (level === 'warn') {
    console.warn(line)
  } else {
    console.log(line)
  }
}

export const aiLogger = {
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext) => log('error', message, context),
}
