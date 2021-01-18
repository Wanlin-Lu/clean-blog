import './style.css'
import './style.scss'
import { cube } from './math.js'
import icon from './res/icon.png'

if (process.env.NODE_ENV === 'production') {
  console.log('Looks like we are in production mood!')
}

function component () {
	let element = document.createElement('pre')

	let [a,b] = [120,340]

	element.innerHTML = [
		'Hello webpack',
		'5 cubed is equal to ' + cube(5),
		a,
		b,
	].join('\n\n')

	return element
}

let element = component()

const img = document.createElement('img')
img.src = icon
document.body.appendChild(element)
document.body.appendChild(img)

$(function() {
	$('pre').text('jQuery')
	alert('import jquery to webpack!done!')
})