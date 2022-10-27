const secondsToTime = (secondsTime: number): string => {
  const minutes = Math.floor(secondsTime / 60)
      .toString()
      .padStart(2, '0'),
    seconds = Math.floor(secondsTime % 60)
      .toString()
      .padStart(2, '0')

  return `${minutes}:${seconds}`
}

export { secondsToTime }
