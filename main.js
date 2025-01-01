function isLeapYear() {
  const date = new Date()
  const year = date.getFullYear()

   return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

const size = isLeapYear() ? 366 : 365

function getProgress() {
  const progress = localStorage.getItem('progress')
  
  if (!progress) return 0

  if (Number.isNaN(progress)) return 0

  return Number(progress)
}

function didCheckpoint() {
  return !canCheckpoint() 
}

function loadProgressBar() {
  const progressBar = document.getElementById('progress')
  const title = document.getElementById('title')
  const button = document.getElementById('ok')

  const progress = getProgress()

  if (progress > 0) {
    const percentage = progress * 100 / size

    title.textContent = `${progress}/${size}`
    progressBar.style.width = `${percentage}%`

    if (progress === size || didCheckpoint()) {
      button.textContent = 'Congratulations!'
      button.style['pointer-events'] = 'none'
    }
  }
}

function canCheckpoint() {
  const lastDay = localStorage.getItem('last-day')
  const lastMonth = localStorage.getItem('last-month')

  if (!lastDay || !lastMonth) return true

  const ld = Number(lastDay)
  const lm = Number(lastMonth)

  if (Number.isNaN(ld) || Number.isNaN(lm)) {
    return true
  }

  const date = new Date()

  return date.getMonth() !== lm && date.getDate() != ld
}

window.onload = () => {
  loadProgressBar()

  const button = document.getElementById('ok')

  button.addEventListener('click', () => {
    if (canCheckpoint()) {
      const date = new Date()

      const [d, m] = [date.getDate(), date.getMonth()]

      const progress = getProgress()

      if (progress < size) {
        localStorage.setItem('progress', String(progress + 1))
        localStorage.setItem('last-day', String(d))
        localStorage.setItem('last-month', String(m))

        loadProgressBar()
      }
    }
  })
}
