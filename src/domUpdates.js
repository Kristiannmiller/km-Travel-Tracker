const domUpdates = {
  changePageDisplay(displayPage) {
    const loginPage = document.querySelector('.loginPage')
    const dashboard = document.querySelector('.dashboard')
    const planTripView = document.querySelector('.planTripView')
    const upcomingView = document.querySelector('.upcomingView')
    this.hidePages([loginPage, dashboard, planTripView, upcomingView])
    if (displayPage === 'login') {
      loginPage.classList.remove('hidden')
    } else if (displayPage === 'dashboard') {
      dashboard.classList.remove('hidden')
      upcomingView.classList.remove('hidden')
    } else if (displayPage === 'planTripView') {
      dashboard.classList.remove('hidden')
      planTripView.classList.remove('hidden')
    }
  },
  hidePages(pages) {
    pages.forEach(page => page.classList.add('hidden'))
  },
  greetTraveler(currentTraveler) {
    const greetingText = document.querySelector('.greeting')
    greetingText.innerText = `AHOY! ${currentTraveler.sayFirstName()}`
  }
}

export default domUpdates;
