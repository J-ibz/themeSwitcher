const body = document.querySelector('body')
const toggleBtn = document.getElementById('themeToggle')


export default function initThemeSwitcher () {
    checkCookies()

    toggleBtn.addEventListener('change', e => {
        if (e.target.checked) {
            body.className = 'dark-theme'
            document.cookie = "theme=dark-theme"        
        }
        else {
            body.className = 'default-theme'
            document.cookie = "theme=normal-theme"
        }
    })
    
    document.querySelector('.themes-container').addEventListener('click', e => {
        const colorPref = e.target.style.background
        document.querySelector(':root').style.setProperty('--accentColor', colorPref)
        document.cookie = `colorPref=${colorPref}`
    })
}


function checkCookies () {
    //easier navigation through the cookies
    const cookie = {};
    document.cookie.split(';').forEach(el => {
      let [key,value] = el.split('=')
      cookie[key.trim()] = value
    })

    //set cookie if there is not cookie
    if (!cookie.theme) document.cookie = "theme=normal-theme"

    if (window.matchMedia('(prefers-color-scheme: dark)') && cookie.theme !== 'normal-theme') {
        document.cookie = "theme=dark-theme"
        cookie.theme = "dark-theme"
    } else document.cookie = "theme=normal-theme"

    if (!cookie.colorPref) {
        const accentColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--accentColor')
        document.cookie = `colorPref=${accentColor}`
        cookie.colorPref = accentColor
    }

    //activate the toggle to the right place
    if (cookie.theme === 'dark-theme') toggleBtn.checked = true
    else toggleBtn.checked = false
    
    //to avoid seeing the toggle moving
    //TODO: If we add some kind of loader/spinner, this timeout is useless also the css rule(.toggle-btn.transition::before {transition: 300ms;}, don't forget to add the transition to the before element tho)
    setTimeout(() => {document.querySelector('.toggle-btn').classList.add('transition')}, 100);
        
    //set appropriate theme and colorPref
    body.className = cookie.theme
    document.querySelector(':root').style.setProperty('--accentColor', cookie.colorPref)
}