export const BUTTON_TYPE_CLASSES = {
	base: 'base',
	blueBack: 'blueBack',
	blueBackSmall: 'blueBackSmall'
}




const LinkButton = ({data, type, text})=>  {
	return (
		<a href={data} target="_blank" rel="noreferrer" className={`listingEach ${BUTTON_TYPE_CLASSES[type]}`}>{text}</a>

		)
}

export default LinkButton;