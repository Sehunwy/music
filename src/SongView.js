import React from 'react'
import ReactDOM from 'react-dom';
class SongView extends React.Component {

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.serverRequest =$.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'get',
            // data: comment,
            success: function(data){
                var playlist = [];
                var music_id = data.data;
                var song_playlist = data.playlist;
                for (var i = 0; i < music_id.length; i++) {
                    var str ='';
                    for (var j = 0; j < song_playlist.length; j++) {
                        if (music_id[i].music_id == song_playlist[j].id) {
                            str = str + "  " + song_playlist[j].playlist_name;
                        }
                    }
                    playlist.push({id: music_id[i].music_id,music_name:music_id[i].music_name,singer:music_id[i].singer,language:music_id[i].singer,music_play: music_id[i].music_play,collection:music_id[i].collection,album_name:music_id[i].album_name,playlist: str})
                }

                this.setState({songs: playlist});

            }.bind(this),
            error: function(xhr,status,err){
                console.error(this.props.url,status,err.toString());
            }.bind(this)
        });
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    List(){
        if(this.state==null)
            return null;
        const listItems = this.state.songs.map((item) =>{
            var  songlist = item.playlist;
            if(songlist=='') {
                songlist = "暂无所属歌单";
            }
            return  <div key={item.id} className="row">
                <div title={item.music_name} className="col-xs-1  omit">{item.music_name}</div>
                <div title={item.singer}  className="col-xs-1 omit">{item.singer}</div>
                <div title={item.language}  className="col-xs-1 omit">{item.language}</div>
                <div title={item.music_play}  className="col-xs-1 omit">{item.music_play}</div>
                <div title={item.collection}  className="col-xs-1 omit">{item.collection}</div>
                <div title={item.album_name}  className="col-xs-1 omit">{item.album_name}</div>
                <div id="songlist'+ {item.id}+'" title={songlist}  className="col-xs-3 omit">{songlist}</div>
                <div className="col-xs-3">'
                    <button className="btn btn-success btn-xs" data-toggle="modal" data-target="#changeChar" >修改</button>
                    <button className="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteChar">删除</button>
                    <button className="btn btn-success btn-xs" data-toggle="modal" data-target="#addPlaylist">添加歌单</button></div>
            </div>
            }
        );
        return listItems
    }

    render() {
        return (
            <div id='Selectsong' className='tablebody'>
                {this.List()}
            </div>
        );
    }

}
export default SongView;