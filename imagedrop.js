class ImageDrop {
	constructor(className, options) {
		this.className = className
		this.parent = null
		this.inputName = Boolean(options.inputName)
			? options.inputName
			: 'images'
		this.label = null
		this.labelBox = null
		this.borderRadius =
			Boolean(options.borderRadius) !== undefined
				? options.borderRadius
				: 'grey'
		this.borderColor = Boolean(options.borderColor)
			? options.borderColor
			: 'grey'
		this.borderWidth =
			options.borderWidth !== undefined ? options.borderWidth : '1px'
		this.input = null
		this.imagebox = null
		this.text = null
		this.textContent = options.textContent
			? options.textContent
			: 'Drag or Drop Images Here'
		this.fontFamily = Boolean(options.fontFamily)
			? options.fontFamily
			: 'san-serif'
		this.fontSize = Boolean(options.fontSize) ? options.fontSize : '20px'
	}
	useFileReader = async (file) => {
		let reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			if (file) {
				let src = reader.result
				this.parent.classList.add('fileadded')
				let newimg = document.createElement('img')
				newimg.src = src
				newimg.alt = file.name
				let newImageBoxItem = document.createElement('div')
				newImageBoxItem.classList.add('image__drop__imagebox__item')
				newImageBoxItem.appendChild(newimg)
				this.imagebox.appendChild(newImageBoxItem)
				newImageBoxItem.style.setProperty('--imagebox-height', `${(this.imagebox.querySelector('img').offsetWidth - 20) / 4}px`)
			} else {
				console.log(`File Upload wasn't possible!`)
			}
		}
	}
	createInput = () => {
		this.input = document.createElement('input')
		this.input.type = 'file'
		this.input.id = 'imagedropid'
		this.input.name = this.inputName
		this.input.setAttribute('multiple', 'multiple')
		this.labelBox.appendChild(this.input)
	}
	createText = () => {
		this.text = document.createElement('div')
		this.text.classList.add('image__drop__text')
		this.text.innerText = this.textContent
		this.text.style.fontSize = this.fontSize
		this.text.style.fontFamily = this.fontFamily
		this.labelBox.appendChild(this.text)
	}
	createImgBox = () => {
		this.imagebox = document.createElement('div')
		this.imagebox.classList.add('image__drop__imagebox')
		this.labelBox.appendChild(this.imagebox)
	}

	createLabelAndBox = () => {
		// label
		this.label = document.createElement('label')
		this.label.classList.add('image__drop__label')
		this.label.setAttribute('for', 'imagedropid')
		this.parent.appendChild(this.label)

		// box
		this.labelBox = document.createElement('div')
		this.labelBox.classList.add('image__drop__label__box')
		this.label.appendChild(this.labelBox)
	}

	parentAddClassName = async () => {
		try {
			this.parent = document.querySelector(`.${this.className}`)
			this.parent.classList.add('image__drop')
			this.parent.style.borderColor = this.borderColor
			this.parent.style.borderWidth = this.borderWidth
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}
	getSrcs = (ev, fileinp) => {
		this.imagebox.innerHTML = ''
		let files = [...fileinp.files]
		files = files.filter(
			(file) => file.type === 'image/png' || file.type === 'image/jpeg'
		)
		if (files[0]) {
			files.forEach(async (file) => {
				await this.useFileReader(file)
			})
		}
	}

	init = async () => {
		if (await this.parentAddClassName()) {
			this.createLabelAndBox()
			this.createInput()
			this.createText()
			this.createImgBox()

			// events
			this.parent.addEventListener('dragover', (e) => e.preventDefault())
			this.parent.addEventListener('drop', (e) => {
				e.preventDefault()
				this.input.value = ''
				this.input.files = e.dataTransfer.files
				this.getSrcs(e, this.input)
			})
			this.input.addEventListener('input', (e) => {
				this.getSrcs(e, this.input)
			})
		}
	}
}

let opts = {
	inputName: 'images',
	textContent: 'Drag or Drop Images Here',
	borderColor: 'grey',
	borderWidth: '2px',
	borderRadius: '12px',
	fontSize: '50px',
	fontFamily: 'san-serif',
}
new ImageDrop('image__drop2323', opts).init()
