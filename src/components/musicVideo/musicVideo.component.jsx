import parse from 'html-react-parser';

const MusicVideo = ({data})=> {
	return (
		<div className="responsive">
			{parse(data.embed_link)}
		</div>		)
}
export default MusicVideo;