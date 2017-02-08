import React, { Component } from 'react';
import { Link } from 'react-router';
import Songs from './Songs';
import Album from './Album';
import Albums from './Albums';
import Artists from './Artists';
import { convertAlbums, convertSong } from '../utils';
import axios from 'axios';

class Artist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artistAlbums: [],
			artistSongs: []
		};
	}

	componentDidMount() {
		const artistId = this.props.routeParams.artistId;

    	axios.get(`/api/artists/${artistId}/albums`)
			.then(res => res.data)
			.then(artistAlbums => this.setState({
				artistAlbums: convertAlbums(artistAlbums),
			}));

		axios.get(`/api/artists/${artistId}/songs`)
			.then(res => res.data)
			.then(artistSongs => this.setState({
				artistSongs: artistSongs.map(song => convertSong(song))
			}));
	}

	render() {
		const artist = this.props.artist;
		return (
		<div>
			<h3>ARTIST NAME{artist.name}</h3>
			<Albums albums={this.state.artistAlbums} />
			<Songs songs={this.state.artistSongs} />
		</div>
		);
	}
}

export default Artist;
